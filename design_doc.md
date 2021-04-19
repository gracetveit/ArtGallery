# State
```typescript
state = {
	arts: {
		byID: {
			[key: number]: {
                id: number,
                title: string,
                description: string
			}
		},
		allIds: Array<string>
	}
    chapters: {
		byID: {
			[key: number]: {
                id: number,
                title: string,
                sequenceNumber: numberm
                description: string
			}
		},
		allIds: Array<string>
	}
    pages: {
		byID: {
			[key: number]: {
			}
		},
		allIds: Array<string>
	}
    tags: {
		byID: {
			[key: number]: {
			}
		},
		allIds: Array<string>
	}
}
```

# Schema

## Art

column name | type | notes
-|-|-
id | number | primary key
title | string | not-null, index, unique
description | text |
type | sting | not-null
created_at | dateTime
updated_at | dateTime

## chapter
column name | type | notes
-|-|-
id | number | primary key
title | string |
sequence_number | number | not-null
description | text
art_id | number | foreign key
created_at | dateTime
updated_at | dateTime

## pages
column name | type | notes
-|-|-
id | number | primary key
sequence_number | number | not-null
location | string | not-null
chapter_id | number | foreign key
created_at | dateTime
updated_at | dateTime

## tags
column name | type | notes
-|-|-
id | number | primary key
name | string | not-null
created_at | dateTime
updated_at | dateTime

## taggings
column name | type | notes
-|-|-
id | number | primary key
chapter_id | number | foreign key 
tag_id | number | foreign key
created_at | dateTime
updated_at | dateTime

## Posts
column name | type | notes
-|-|-
id | number | primary key
body | text
created_at | dateTime
updated_at | dateTime


# Layout
## Components
### Header
```html
<div>
    <h1>Home</h1>
    <h1>Art<h1>
</div>
```

### Footer
```jsx
<div>
    <p>{contactInfo}</p>
    <p>{copyrightInfo}</p>
</div>
```

### Thumbnail
```jsx
<div>
    <img src={thumbnailLocation}/>
    <h3>{title}</h3>
</div>
```

### Gallery
```jsx
<div>
    <h2>{type}</h2>
    <ul>
        {
            pages.map((page) => (
                <Thumbnail page={page} />
            ))
        }
    </ul>
</div>
```

## Pages
### `/art`
```jsx
<body>
    <Header />
    <Gallery />
    <Footer />
</body>
```

# Technologies

# Frontend Routes
```
/
/updates
/art
    /[artId]
        /[chapterId]
```

# Backend Routes
## arts
## tags
## posts

# Todo
- [ ] Proposal
	- [ ] Summary
	- [ ] Key Feature Set
- [ ] Schema
- [ ] Sample State
- [ ] Frontend Routes / Components
- [ ] Backend Routes
- [ ] Technology List
	- [ ] Backend Server
		- [ ] Database
		- [ ] Testing
		- [ ] Encryption
		- [ ] Devtools
	- [ ] Frontend
		- [ ] Store management
		- [ ] Testing
- [ ] Figma Prototype