# Test Resources

This directory contains isolated test resources for study parser tests. These files are snapshots of study content designed to be stable and predictable for testing purposes.

## Files

### `test-study.md` ✅ **Currently Used**
- **Purpose**: Main test file for parseStudy comprehensive test
- **Content**: Custom test study with predictable content including:
  - Custom title extraction
  - Summary with markdown formatting
  - Leaders info sections
  - Question sections with Bible references
  - Mixed content including tables between questions

### `complete-study-with-bible-sections.md`
- **Purpose**: Copy of Study 1 "History's Direction" 
- **Content**: Complete real study example with multiple Bible passage sections
- **Use case**: Testing complex study structures with multiple scripture references

### `study-with-tables-and-mixed-content.md`
- **Purpose**: Copy of Study 2 with table content
- **Content**: Study that includes markdown tables within question sections
- **Use case**: Testing parser's ability to handle mixed content (questions + tables)

### `study-with-nested-headings.md`
- **Purpose**: Copy of Study 3 with nested heading structure
- **Content**: Study with complex nested heading hierarchies
- **Use case**: Testing parser's heading extraction and section organization

### `basic-study-structure.md`
- **Purpose**: Copy of Study 4 with simpler structure
- **Content**: Basic study layout without complex formatting
- **Use case**: Testing minimal study parsing requirements

## Usage Notes

- These files are **isolated from production studies** and won't change when actual study content is updated
- Only add new test resources when you need specific edge cases or structures for testing
- Name files descriptively based on what parsing behavior they test
- Always update this README when adding new test resources