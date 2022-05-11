import Link from 'next/link'
import styles from '../../styles/Post.module.css'
import PostContent from '../../components/PostContent'
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import AuthCheck from '../../components/AuthCheck'
import HeartButton from '../../components/HeartButton'

export async function getStaticProps({ params }) {
  const { username, slug } = params
  const userDoc = await getUserWithUsername(username)

  let post
  let path

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug)
    post = postToJSON(await postRef.get())

    path = postRef.path
  }

  return {
    props: { post, path },
    revalidate: 5000,
  }
}

export async function getStaticPaths() {
  // Improve by using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup('posts').get()

  const paths = snapshot.docs.map(doc => {
    const { slug, username } = doc.data()
    return {
      params: { username, slug },
    }
  })

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: 'blocking', // tells next to fallback to regular SSR, then it can be cached like normal ISR
  }
}

export default function Post(props) {
  const postRef = firestore.doc(props.path)
  const [realtimePost] = useDocumentData(postRef)

  const post = realtimePost || props.post

  return (
    <main className={styles.container}>
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>

        <AuthCheck
          fallback={
            // eslint-disable-next-line @next/next/link-passhref
            <Link href="/enter">
              <button>🧡 sign up</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>
      </aside>
    </main>
  )
}
