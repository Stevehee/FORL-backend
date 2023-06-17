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
- `args[3-]` - The arguments of the target predicate. (could leave as empty).
- `args[args.length - 1]` - The number of arguments of the target predicate.

For example:

javac \*.java  
java Main adult.data isGreater 1 3

Result for example run :

Head: isGreater 1 ()
Body: Marital Status 2 (Married-civ-spouse), Education 2 (Bachelors), Occupation 2 (Exec-managerial), Workclass 2 (Private)

Head: isGreater 1 ()
Body: Relationship 2 (Husband), Occupation 2 (Prof-specialty), Education 2 (Prof-school), Workclass 2 (Self-emp-inc)

Head: isGreater 1 ()
Body: Sex 2 (Male), Education 2 (Masters), Native Country 2 (United-States), Workclass 2 (Federal-gov)

Head: isGreater 1 ()
Body: Relationship 2 (Wife), Workclass 2 (Local-gov), Education 2 (Doctorate)

Head: isGreater 1 ()
Body: Race 2 (White), Occupation 2 (Sales), Workclass 2 (Self-emp-not-inc), Native Country 2 (Canada)
