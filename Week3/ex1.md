# 1FN rules:

1- All data must be atomic (every column should only contain a single value)
2- Repeating columns are not allowed
3- Prevent duplicate records (by applying primary keys)
4- Attribute domain should not change (all values in a column must be of the same kind or type).

## Q1 - What columns violate 1NF?

- The following columns violate the 1FN:

  - member_id : violate the rules (3)
  - member_address : violate the rules (1,4)
  - venue_description : violate the rules (1)
  - food_code : violate the rules (1,4)
  - food_description : violate the rules (1)

## Q2 - What entities do you recognize that could be extracted?

- I can extract to three tables as following:
  1-member table
  2-dinner table
  3-food table
  4- I need also two tables to break the many to many relationship between
  (member & dinner) and (dinner & food)

## Q3 - Name all the tables and columns that would make a 3NF compliant solution.?

-
