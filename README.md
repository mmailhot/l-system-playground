l-system-playground
===================

A playground for basic L-Systems in the browser

For a good explanation of how they work see (wikipedia)[http://en.wikipedia.org/wiki/L-system]

##Options

###System Options

####Start

The initial state of the system

####Rules

A list of the rules that will be applied on each iteration. One rule per line written as `X -> Y` where `X` is the substring to be replaced and `Y` is the substring to replace it with. Example

````
F -> FF
X -> F-[[X]+X]+F[+FX]-X
````

####Special Characters

Visual drawing works in a "turtle" like manner. Certain character have special meanings to control the drawing

- __F__ and __G__ both incdicate a forward movement (drawing a line), and are functionally equivalent to the drawing system
- __-__ indicates a left turn
- __+__ indicates a right turn
- __[__ saves the current position and heading onto the top of the state stack
- __]__ pops the top state off that stack and applies it (returning to that earlier state)

####Iterations

The number of iterations to perform before drawing

###Visual Options

#### Forward Length (px)

How far to move forward when a __F__ or __G__ is encountered

#### Left Turn (Degrees)

How many degrees left to turn when a __-__ character is encountered

#### Right Turn (Degrees)

How many degrees right to turn when a __+__ character is encountered

#### Starting Heading

The initial heading

#### Origin

Where to begin drawing from

##Todo

- Add support to assign actions to arbitrary character
- Support randomness in the generator
- Improve UI