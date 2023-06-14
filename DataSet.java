import java.util.*;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class DataSet {

  List<Tuple> tuples;

  public DataSet(String fileName) {

    tuples = new ArrayList<>();

    try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
      String line;
      int counter = 0;
      while ((line = br.readLine()) != null) {
        String[] parts = line.split(",");
        Tuple tuple = new Tuple(counter++, parts);
        tuples.add(tuple);
      }
    } catch (IOException e) {
      e.printStackTrace();
    }

  }

  public List<Tuple> getTuples() {
    return this.tuples;
  }

  public List<Tuple> loadNegativeData(Literal literal) {
    List<Tuple> negativeData = new ArrayList<>();
    for (Tuple tuple : tuples) {
      if (!tuple.getLiterals().contains(literal)) {
        negativeData.add(tuple);
      }
    }
    return negativeData;
  }

  public List<Tuple> loadPositiveData(Literal literal) {
    List<Tuple> positiveData = new ArrayList<>();
    for (Tuple tuple : tuples) {
      if (tuple.getLiterals().contains(literal)) {
        positiveData.add(tuple);
      }
    }
    return positiveData;
  }

  public Set<Literal> loadPredicates() {
    Set<Literal> predicates = new HashSet<>();
    for (Tuple tuple : tuples) {
      predicates.addAll(tuple.getLiterals());
    }
    return predicates;
  }

}
