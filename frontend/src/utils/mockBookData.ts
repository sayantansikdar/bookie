export interface BookDetails {
  id: number;
  title: string;
  author: string;
  coverImage: string;
}

const classicAuthors = [
  "Haruki Murakami", "Gabriel García Márquez", "Jane Austen", "Frank Herbert",
  "Isaac Asimov", "Toni Morrison", "J.R.R. Tolkien", "Ursula K. Le Guin", "Neil Gaiman"
];

const bookTitles = [
  "The Wind-Up Bird Chronicle", "One Hundred Years of Solitude", "Pride and Prejudice",
  "Dune", "Foundation", "Beloved", "The Fellowship of the Ring", "The Left Hand of Darkness",
  "American Gods", "The Name of the Wind", "Neuromancer", "Snow Crash", "Hyperion", "1984"
];

const seedRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

export const getBookDetails = (id: number): BookDetails => {
  const titleIndex = Math.floor(seedRandom(id * 13) * bookTitles.length);
  const authorIndex = Math.floor(seedRandom(id * 17) * classicAuthors.length);
  
  const coverImage = `https://picsum.photos/seed/${id * 42}/400/600`;

  return {
    id,
    title: bookTitles[titleIndex],
    author: classicAuthors[authorIndex],
    coverImage
  };
};
