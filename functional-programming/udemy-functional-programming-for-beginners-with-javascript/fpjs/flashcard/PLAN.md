# Flashcard Study App

## Features

1.  Create new Flashcards
2.  Edit Flashcard Questions and Answers
3.  Delete Flashcards
4.  Answer Shown When requested.
5.  Ability to self grade your own answer
6.  Sort cards by answer ranking ascending
    Bad Answer => Rank = 0
    Good Answer => Rank = Rank + 1
    Great Great => Rank = Rank + 2

## Tips

* Look at plain html and css in ./design/index.html file
  * `npm run design` command will show html and css in browser
* For sorting look at the following Ramda functions:
  [sortWith](http://ramdajs.com/docs/#sortWith)
  [ascend](http://ramdajs.com/docs/#ascend)
  [descend](http://ramdajs.com/docs/#descend)

## Model

* cards
  * card
    * id
    * question
    * answer
    * rank
    * showEdit
    * showAnswer

## Update Functions

* add flash card
* edit flash card
  * done by clicking the question or shown answer
* save flash card
* delete flash card

* show answer
* rate flash card

  * hides answer
  * updates rank

* sort cards by rank
  * done on updates? Potentially just a view thing since it's not a real update

## View Functions

* cardList

  * card
    * delete icon
    * editMode
      * labelInput
      * saveButton
    * questionMode
      * editText
      * showHidden
      * rankings

* card list
  * card
    * delete icon
    * edit mode
      * Question fieldset
        * label
        * input
      * Answer fieldset
      * Save button
    * view mode
      * question EditText
        * label
        * EditText
      * show answer action
        * default: link
        * expanded view
          * displays answer EditText
            * clicking on this brings it to edit mode
          * rating
            * updates the cards rank
            * closes expanded view
