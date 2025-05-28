document.addEventListener('DOMContentLoaded', () => {
    const postCommentBtn = document.getElementById('post-comment');
    const commentInput = document.getElementById('comment-input');
    const commentsList = document.getElementById('comments-list');
    const mainVideoPlayer = document.getElementById('main-video-player');
    const currentVideoTitle = document.getElementById('current-video-title');
    const videoPlaylist = document.querySelector('.video-playlist');
    const videoNotesList = document.querySelector('.video-notes-list'); // This is the playlist for notes
    const pdfViewerContainer = document.getElementById('pdf-viewer-container'); // The container for the PDF
    const currentVideoNotesText = document.getElementById('current-video-notes-text'); // Initial placeholder text

    // Define PDF paths for each video.
    // Ensure these paths are correct relative to your java.html file.
    const videoPdfPaths = {
        "Introduction to Java Bacics": "JavaChapter1.pdf", // Assuming JavaChapter1.pdf is in the same directory as java.html
        "Basic Structure of Java": "notes/basic_structure.pdf", // Example: if you have a 'notes' folder
        "Variable & Datatypes": "notes/variables_datatypes.pdf",
        "Literals in Java": "notes/literals.pdf",
        " Input In Java": "notes/input_in_java.pdf",
        "Exercise #1 Java": "notes/exercise1.pdf",
        "Question set in Java #1": "notes/question_set1.pdf",
        " Types of Operators & Expressions in Java": "notes/operators_expressions.pdf"
    };

    // ... (existing postCommentBtn event listener) ...

    // Function to update active states and load PDF
    const updateActiveStatesAndPdf = (selectedIndex, videoTitle) => {
        // Update video playlist active state (existing)
        Array.from(videoPlaylist.children).forEach((item, index) => {
            if (index === selectedIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update video notes playlist active state (existing)
        Array.from(videoNotesList.children).forEach((item, index) => {
            // Check the data-video-index on the <li> or the <a> if you changed it
            if (index === selectedIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Load the PDF into the iframe
        const pdfPath = videoPdfPaths[videoTitle];
        if (pdfPath) {
            // Create or update the iframe
            let pdfIframe = pdfViewerContainer.querySelector('iframe');
            if (!pdfIframe) {
                pdfIframe = document.createElement('iframe');
                pdfViewerContainer.innerHTML = ''; // Clear initial text
                pdfViewerContainer.appendChild(pdfIframe);
            }
            pdfIframe.src = pdfPath;
        } else {
            // If no PDF found, display a message
            pdfViewerContainer.innerHTML = `<p id="current-video-notes-text">Notes for this video are not available.</p>`;
        }
    };

    // Handle video playlist selection
    videoPlaylist.addEventListener('click', (event) => {
        let listItem = event.target.closest('li');
        if (listItem && listItem.hasAttribute('data-video-url')) {
            const videoUrl = listItem.getAttribute('data-video-url');
            const videoTitle = listItem.getAttribute('data-video-title');
            const videoIndex = Array.from(videoPlaylist.children).indexOf(listItem);

            mainVideoPlayer.src = videoUrl;
            currentVideoTitle.innerHTML = `${videoTitle.replace('Java Bacics', '<span style="color: #1cd400;">Java Bacics</span>')}`;

            updateActiveStatesAndPdf(videoIndex, videoTitle);
        }
    });

    // Handle initial active state and load initial PDF
    const initialActiveVideo = videoPlaylist.querySelector('.active');
    if (initialActiveVideo) {
        const initialIndex = Array.from(videoPlaylist.children).indexOf(initialActiveVideo);
        const initialVideoTitle = initialActiveVideo.getAttribute('data-video-title');
        updateActiveStatesAndPdf(initialIndex, initialVideoTitle);
    }
});