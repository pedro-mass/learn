tutorial: https://youtu.be/c-hKSbzooAg?si=KZ_c8IDxUy4691CK

## chapters

- [x] Intro - 00:00
- [x] Init - 02:03
- [x] UI scaffolding - 07:26
- [x] CI/CD and deployment - 12:23
- [x] Database setup (with SingleStore) - 22:58
- [x] Database schema and table creation - 53:04
- [x] Connecting the UI to the database - 1:08:18
- [x] Fixing breadcrumbs - 1:31:22
- [x] Tidying up data layer - 1:39:48
- [x] Authentication (with Clerk) - 1:49:30
- [x] File uploads (with UploadThing) - 2:02:55
- [x] Modeling files in DB - 2:23:39
- [x] Analytics (with Posthog) - 2:40:46
- [x] General tidying up - 2:58:40
- [x] Home page and onboarding flows - 3:10:49
- [x] Homework - 3:23:53
- [x] Outro - 3:26:51

https://youtu.be/c-hKSbzooAg?si=-O1WZfPRPXhmPyNh&t=11462

### tasks

- [x] set up database and data model
- [x] move folder open state to URL
- [x] add auth
- [x] add file uploading
- [x] add analytics
- [x] make sure sort order is consistent
- [x] add delete
- [x] real homepage + onboarding

## Fun follow ups

### Folder creations

Make a server action that takes a name and parentId, and creates a folder with that name and parentId (don't forget to set the ownerId).

### Access control

Check if user is owner before showing the folder page.

### Folder deletions

Make sure you fetch all of the folders that have it as a parent, and their children too

### Make a "file view" page

You get the idea. Maybe check out my last tutorial?

### Toasts!

### Gray out a row while it's being deleted

## environment links

- netlify: https://app.netlify.com/projects/peppy-smakager-9f2cd1/overview
- singlestore: https://portal.singlestore.com/organizations/44b9292e-f27a-46f6-8625-c0ec10605feb/virtual-workspaces/fb3d5a43-bcfa-4bc4-8f4e-a67cdd939b69
- clerk: https://dashboard.clerk.com/apps/app_313aXa40Ns41qRFJ5uu1eJblslF/instances/ins_313aXVyQhf2w3i7oHD8wd3fpi57
- uploadThing: https://uploadthing.com/dashboard/pedro-mass-personal-team/82u57ffrls/api-keys
- posthog: https://us.posthog.com/project/205503

## refs

- following: https://www.youtube.com/watch?v=c-hKSbzooAg&t=2736s
- repo: https://github.com/t3dotgg/drive-tutorial
- UI starter - https://v0.dev/chat/google-drive-clone-ui-6jEAM0wxOgc?b=b_fFQhsfElqQi&f=0
- SingleStore tutorial - https://www.singlestore.com/blog/singlestore-drizzle-integration/
- CI FILE - https://github.com/t3dotgg/drive-tutorial/blob/main/.github/workflows/ci.yaml
