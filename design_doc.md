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
title | string |
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

## updates
column name | type | notes
-|-|-
id | number | primary key
body | text
created_at | dateTime
updated_at | dateTime

# Frontend Routes
```
/
/updates
	/[updateId]
/art
    /[artId]
        /[chapterId]
```

## Pages
### `/`
```jsx
<body>
	<div>
		<Link href="/updates">
			<p>This site contains adult content</p>
		</Link>
	</div>
</body>
```

### `/updates`
```jsx
<body>
	<Layout>
		<Post id={MostRecentPostId} />
		<PostList />
	</Layout>
</body>
```

### `updates/[updateId]`
```jsx
<body>
	<Layout>
		<Post id={updateId}>
	</Layout>
</body>
```

### `/art`
```jsx
<body>
    <Layout>
    	<Gallery />
    </Layout>
</body>
```

### `art/[artId]`
```jsx
<body>
	<Layout>
		<Chapters art={artId}/>
	</Layout>
</body>
```

### `art/[artId]/[chapterId]`
```jsx
<body>
	<Layout>
		<ChapterNav chapter_id={chapterID}/>
		<Comic chapter_id={chapterID} />
		<ChapterNav />
	</Layout>
</body>
```

## Components
- [x] `Layout`
- [x] `Header`
- [x] `Footer`
- [x] `Post`
- [x] `PostList`
- [x] `Gallery`
  - [x] `Thumbnail`
- [x] `Chapters`
- [x] `ChapterNav`
- [x] `Comic`


### Layout
```jsx
<div>
	<Header />
	<div>{children}</div>
	<Footer />
</div>
```

### Header
```jsx
<div>
	<Link href="/updates">
    	<h1>Updates</h1>
	</Link>
	<Link href="/art">
    	<h1>Art<h1>
	</Link>
</div>
```

### Footer
```jsx
<div>
    <p>{contactInfo}</p>
    <p>{copyrightInfo}</p>
</div>
```

### Post
```jsx
<div>
	<h1>{post.date}<h1>
	<p>{post.body}</p>
</div>
```

### PostList
```jsx
<div>
	<h1>Past Updates</h1>
	<ul>
		{
			posts.map((post) => (
				<li>{post.date}</li>
			))
		}
	</ul>
</div>
```

### Gallery
```jsx
<div>
    <h2>{arttype}</h2>
    <ul>
        {
            pages.map((page) => (
				<li>
                	<Thumbnail page={page} />
				</li>
            ))
        }
    </ul>
</div>
```

### Thumbnail
```jsx
<div>
    <img src={thumbnailLocation}/>
    <h3>{title}</h3>
</div>
```

### Chapters
```jsx
<div>
	<h2>{Chapter Name}</h2>
	<ul>
		{
			chapters.map((chapter) => (
				<li>
					<Thumbnail page={chapter} />
				</li>
			))
		}
	<ul>
</div>
```

### ChapterNav
```jsx
<div>
	<p>Previous</p>
	<select>
	<p>Next</p>
</div>
```

### Comic
```jsx
<div>
	{
		pages.map((page) => (
			<img src={page.location}>
		))
	}
</div>
```

# Public
```
/art
	/sequences
		/chapters
			/pages
	/paintings
	/sketches
```

# Technologies
## Backend Server
- Prisma: SQL ORM
## Frontend
- Typescript
- React
- NextJS

# Backend Routes (?)
## `art`
- `GET /api/art`
- `GET /api/art/:id`
- `POST /api/art` - Creates a new piece of art
- `DELETE /api/art/:id` - Deletes a piece of art
- `PATCH /api/art/:id` - Updates a piece of art
## `updates`
- `GET /api/updates`
- `GET /api/updates/:id`
- `POST /api/updates`
- `PATCH /api/updates/:id`
- `DELETE /api/updates/:id`

# Todo
- [x] Proposal
	- [ ] Summary
	- [ ] Key Feature Set
- [x] Schema
- [ ] Sample State
- [X] Frontend Routes
  - [x] Pages
    - [x] Components
- [x] Backend Routes
- [x] Technology List
	- [ ] Backend Server
		- [ ] Database
		- [ ] Testing
		- [ ] Encryption
		- [ ] Devtools
	- [ ] Frontend
		- [ ] Store management
		- [ ] Testing
- [x] Figma Prototype
  - [x] `/`
  - [x] `/updates`
  - [x] `/updates/[updateId]`
  - [ ] `/art`
  - [ ] `art/[artId]`
  - [ ] `art/[artId]/[chapterId]`