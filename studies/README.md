# Study Format Guide

This guide explains how to write and format studies for the Bible Overview App. Each study is written in **[Markdown](https://www.markdownguide.org/basic-syntax/)** format and follows a specific structure that the app can parse and display correctly.

## File Naming

Studies should be named with the pattern: `{number}.md`

Examples:
- `1.md` - Study 1
- `2.md` - Study 2  
- `15.md` - Study 15

## Basic Study Structure

Every study must follow this **exact structure** with these sections in order:

```markdown
# Study {number} - {Title}

## Summary

## Introduction

## What

## So What

## Questions
```

## Section Details

### 1. Study Title (Required)

The first line must be a level 1 heading with the study number and title:

```markdown
# Study 1 - History's Direction
```

- **Study number**: Must match the filename (e.g., `1.md` → `Study 1`)
- **Title**: Can be any descriptive title
- The app will extract both the number and title automatically

### 3. Summary Section (Required)

```markdown
## Summary

The Bible is not a random collection of moral lessons, but one unfolding story - the greatest story ever told.

**Ephesians 1** teaches us that history has an author and a goal: the triune God working to restore our sin-wrecked world.

**Acts 13** teaches us that history has a focus and a pattern: God chose to focus on one particular people, the Israelites.
```

- Provides a brief overview of the study's main points
- Can include **bold text** and other markdown formatting

### 4. Introduction Section (Required)

These are the leaders notes.

```markdown
## Introduction

> We are the storytelling animal, there is no other creature on earth that tells itself stories in order to understand who it is.
>
> (Salman Rushdie, Spectator)

There are many different stories which humans use to understand ourselves.

- **Evolution** tells us that we are part of the natural world
- **Progressive liberalism** tells us that our story is one of oppression and liberation
```

- Sets the context for the study
- Can include quotes (using `>` for blockquotes)
- Often includes bullet points with **bold** headings

### 5. What Section (Required)

```markdown
## What

What is the main point we want to teach?

God's plan for history centres on Christ, not us. The end of chaos and disorder will be found in the blessed rule of Jesus Christ.
```

- Explains the main theological or biblical truth
- Answers "What is God teaching us through this passage?"
- Should be clear and concise for leaders to understand the key point

### 6. So What Section (Required)

```markdown
## So What

So what should we do about it?

Pray for a heart that delights to see Jesus at the heart of the story, not me. Pray too for a deepening awe and trust as you see God working out his perfect purposes.
```

- Explains the application and response
- Answers "What difference should this make to our lives?"
- Often includes practical steps or prayer points

### 7. Questions Section (Required)

```markdown
## Questions

- What different "stories" do humans tell to make sense of who we are and our place in the world?
  - if they need help: 'for example, what story does evolutionary atheism tell?'

### Read Ephesians 1:9-14

- What is God's plan for the universe?
- How certain is the achievement of that plan?
- What part do we play in God's plan?
  - This is a leader's hint for guidance

### Read Acts 13:13-39

- What events in Israel's history does Paul touch on?
- Look at verses 26-31. What words and phrases are used to describe how Jesus relates to the OT?
  - Look at vv. 23, 27, 29, 32, 33.
```

**Question Section Rules:**

1. **Introduction Questions**: Start with general questions (no subheading)
2. **Bible Passage Sections**: Use `### Read {Bible Reference}` for each passage
3. **Questions**: Use bullet points (`-`) for each question
4. **Leader Hints**: Indent with 2 spaces and use `-` for hints/guidance to leaders
5. **Specific References**: Can reference specific verses in hints (e.g., "Look at vv. 23, 27, 29")

## Advanced Formatting

### Mixed Content in Question Sections

You can include explanatory text, tables, or other content between questions:

```markdown
### Read Genesis 2:4-25

- What things does Genesis 2 include in its vision of paradise?

We will look at it under 4 categories: God, Place, Work, People:

| Category | Description |
|----------|-------------|
| God      | How God relates to us |
| Place    | The garden environment |

### God

- How does God relate to us here?
- What does this mean for human flourishing?
```

### How Bible References Work in the App

The app detects and displays Bible references from **question section headings only**:

```markdown
### Read Ephesians 1:9-14    ← App detects "Ephesians 1:9-14"
### Genesis 1:1-3:3          ← App detects "Genesis 1:1-3:3"
```

- These references become the main passages shown for the study
- They're automatically made clickable to open Bible passages
- Multiple references in one heading are supported: `### Read Luke 2:1-20, Matthew 1:18-25`

### Formatting Tips

- **Bold text**: `**Important point**`
- *Italic text*: `*emphasis*`
- Block quotes: `> Quote text`
- Verse references like "v.5", "vv.23-25", "verses 12-15" become clickable links within questions

## Common Mistakes to Avoid

1. **Wrong heading levels**: Must use `#` for title, `##` for sections, `###` for Bible passages
2. **Missing sections**: All 6 main sections are required (Summary, Introduction, What, So What, Questions)
3. **Inconsistent bullet points**: Use `-` (dash) not `*` (asterisk) for questions
4. **Wrong Bible reference format**: Use standard format like "Ephesians 1:9-14"
5. **Mixed up section order**: Sections must be in the exact order shown above

## Study Schedule Management

### Schedule.csv File

The `schedule.csv` file controls the study calendar and schedule in the app. It defines:

- Which weeks have studies vs. other activities
- Break periods (Christmas, Easter, etc.)
- Prayer meetings and special events
- Overall study progression timing

**File Format:**
```csv
Week Starting,Has Study,Notes
2025-09-01,No,Prayer Meeting
2025-09-08,Yes,
2025-09-15,Yes,
2025-09-22,Yes,
2025-09-29,No,Prayer Meeting
2025-12-22,No,Christmas break
2025-12-29,No,Christmas break
```

**Column Definitions:**
- **Week Starting**: Date in `YYYY-MM-DD` format (must be a Monday)
- **Has Study**: `Yes` or `No` - whether this week includes a study
- **Notes**: Optional description for non-study weeks (e.g., "Prayer Meeting", "Christmas break")

**Usage Guidelines:**
1. **Start dates**: Always use Monday dates for week starting
2. **Study weeks**: Set `Has Study` to `Yes` and leave Notes empty
3. **Special weeks**: Set `Has Study` to `No` and add descriptive Notes
4. **Breaks**: Mark holiday periods clearly (Christmas, Easter, summer)
5. **Build after changes**: Run `yarn run build` to update the app schedule

The app automatically assigns study numbers to weeks marked `Has Study=Yes` in chronological order (Study 1, Study 2, etc.).

## Testing Your Study

After writing a study, you can test it by:

1. Running the build command: `yarn run build`
2. Checking the generated studies in the app
3. Ensuring all Bible references are clickable
4. Verifying questions display properly with leader hints

## Example Complete Study Structure

```markdown
# Study 1 - History's Direction

- Ephesians 1:9-14
- Acts 13:13-39

## Summary

Brief overview of the study's main teaching points.

## Introduction

Context and contemporary relevance that leads into the Bible study.

## What

The main theological truth or biblical teaching.

## So What

The practical application and response.

## Questions

- General introduction question?
  - Leader hint for guidance

### Read Ephesians 1:9-14

- Specific questions about this passage?
- How does this apply to us?

### Read Acts 13:13-39

- Questions about this second passage?
  - More detailed leader guidance
```

This format ensures your study will be parsed correctly by the app and display beautifully for group leaders and participants.