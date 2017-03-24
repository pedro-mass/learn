# Git

## Install Git

### Linux
On Ubuntu, open Terminal

Run: `sudo apt-get -y install git`

On Redhat/CentOS, open Terminal

Run: `sudo yum -y install git`

### Mac
On Mavericks (10.9) or above you can do this simply by trying to run `git` from the Terminal

Or install latest binary from `http://git-scm.com/download/mac`

### Windows
Download/Install Git from `http://git-scm.com/download/win`


## Set up a git config
Define the author name to be used for all commits by the current user.

`git config --global user.name <name>`
	
Define the author email to be used for all commits by the current user.

`git config --global user.email <email>`


## Task 1: Create a Repo

Create a new folder for your project

`mkdir samplerepo`

Initialize git

`git init`

Check the status of your working copy/directory

`git status`

## Task 2: Add a File

Create a new file

`touch README.txt`

Add content to the new file

`echo "hello" >> README.txt`  (or open the file using an editor and add content)

## Task 3: Commit Changes
Stage the file for commit

`git add . or git add -A`

Commit the changes

`git commit -m "Add readme file"`

## Task 4: Push to GitHub

Create a repository on `https://github.com/`. Then add the created repository as a remote.

`git remote add origin https://github.com/user/repo.git`

Verify remotes

`git remote -v`

Push branch to remote

`git push <remote name> <branch name>`

## Task 5: Edit File, Push, Pull

Edit the `README.txt` file

Commit the changes

`git commit -m "Update readme file"`


Push branch to remote

`git push <remote name> <branch name>`

Get the latest from remote

`git pull origin master`
