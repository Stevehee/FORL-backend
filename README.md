# First Order Inductive Learner (FOIL)

This repository contains a Java implementation of the FOIL (First Order Inductive Learner) algorithm for rule-based machine learning.

## Files

- `Constants.java`: Contains constant attributes used in other classes.
- `DataSet.java`: Handles data loading from files and data manipulation.
- `Literal.java`: Represents a predicate with arguments.
- `Predicate.java`: Base class for a predicate.
- `Rule.java`: Represents a rule in the form of a head literal and a body of literals.
- `Tuple.java`: Represents an instance of data as a list of literals.
- `Main.java`: The main class that drives the FOIL algorithm.

## Usage

To run the FOIL algorithm, compile and run the `Main.java` class with the required arguments:

- `args[0]` - The path to the data file.
- `args[1]` - The name of the target predicate.
- `args[2]` - The number of arguments of the target predicate.
- `args[3-n]` - The arguments of the target predicate. (could leave as empty).

For example:

javac \*.java  
java Main adult.data isGreater 1
