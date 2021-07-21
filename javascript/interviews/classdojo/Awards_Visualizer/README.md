ASSIGNMENT:
Awards Visualizer

DESCRIPTION:
Today, you're going to implement a design mock for a portion of a web app.
The app should help teachers easily break down the point totals for their
ClassDojo classes.  You'll be implementing a mock we've provided, but feel
free to make suggestions if you think you can improve things!

We've provided two screenshots in the "mocks" folder; if you'd like the
original Sketch document, we can provide that too.  We've also provided an
API endpoint to fetch the data that you'll be displaying.

You should approach this assignment as if it were a real project.  You can
use any libraries, frameworks, or tools that you'd like.  You should try to
organize your code in a clean and maintainable manner.

SPECS:

* Visual mocks
  - Included in the "Mocks" folder

* API
  - You can fetch a list of 3000 student points at
    "https://teach.classdojo.com/api/interviewChallenge"
  - The route includes CORS headers for all domains, so you should be able
    to access it from localhost.
  - An optional "size" query parameter will return the given number of points,
    but the maximum is 3000.
  - The schema of each point is as follows:

    * id:             A unique id for each point.
    * classroom:      The class in which the point was given.
    * student:        The recipient of the point. Student names are unique.
    * studentAvatar:  A link to the avatar of the recipient, in png format.
    * date:           The time the point was given.
    * behavior:       The name of the behavior the point was given for.
    * weight:         How much the point was worth (positive for good
                      behaviors, negative for bad behaviors).