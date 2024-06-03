 export let bookcontroller = async (req, res) => {
    try {
      // Extract book data from the request body
      const { title, content, frontCoverImage, backCoverImage, textAlign, authorName } = req.body;
  
      // Create a new document in the Book model
      const newBook = new booksModel({
        userId: req.user,
        title: title,
        content: content,
        frontCoverImage: frontCoverImage,
        backCoverImage: backCoverImage,
        textAlign: textAlign,
        authorName: authorName
      });

      await newBook.save();
  
     
      res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
      
      console.error('Error adding book:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

export const getBooksByUser = async (req, res) => {
  try {
    const userId = req.user; // Assuming the user ID is available on the req.user object

    // Find all books where the userId matches
    const books = await booksModel.find({ userId });

    // Send the books as a response
    res.status(200).json({ books });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

