document.addEventListener('DOMContentLoaded', () => {
    const postCommentBtn = document.getElementById('post-comment');
    const commentInput = document.getElementById('comment-input');
    const commentsList = document.getElementById('comments-list');
    const mainVideoPlayer = document.getElementById('main-video-player');
    const currentVideoTitle = document.getElementById('current-video-title');
    const videoPlaylist = document.querySelector('.video-playlist'); // Select the ul element

    // Handle posting new comments
    postCommentBtn.addEventListener('click', () => {
        const commentText = commentInput.value.trim();

        if (commentText) {
            const newCommentDiv = document.createElement('div');
            newCommentDiv.classList.add('comment-item');

            const authorPara = document.createElement('p');
            authorPara.classList.add('comment-author');
            authorPara.innerHTML = `Anonymous User <span class="comment-date">${new Date().toLocaleDateString()}</span>`;

            const textPara = document.createElement('p');
            textPara.classList.add('comment-text');
            textPara.textContent = commentText;

            newCommentDiv.appendChild(authorPara);
            newCommentDiv.appendChild(textPara);

            commentsList.prepend(newCommentDiv); // Add new comment to the top
            commentInput.value = ''; // Clear the input field
        }
    });

    // Handle video playlist selection
    videoPlaylist.addEventListener('click', (event) => {
        let listItem = event.target.closest('li'); // Find the closest 'li' ancestor of the clicked element

        if (listItem && listItem.hasAttribute('data-video-url')) {
            // Remove active class from previously active item
            const currentActive = videoPlaylist.querySelector('.active');
            if (currentActive) {
                currentActive.classList.remove('active');
            }

            // Set current item as active
            listItem.classList.add('active');

            // Change main video player source
            const videoUrl = listItem.getAttribute('data-video-url');
            const videoTitle = listItem.getAttribute('data-video-title');

            mainVideoPlayer.src = videoUrl; // Update the iframe's src
            currentVideoTitle.textContent = videoTitle; // Update the video title below the player
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const postCommentBtn = document.getElementById('post-comment');
    const commentInput = document.getElementById('comment-input');
    const commentsList = document.getElementById('comments-list');
    const mainVideoPlayer = document.getElementById('main-video-player');
    const currentVideoTitle = document.getElementById('current-video-title');
    const videoPlaylist = document.querySelector('.video-playlist');
    const videoNotesList = document.querySelector('.video-notes-list'); // Get the new notes playlist

    // Handle posting new comments
    postCommentBtn.addEventListener('click', () => {
        const commentText = commentInput.value.trim();

        if (commentText) {
            const newCommentDiv = document.createElement('div');
            newCommentDiv.classList.add('comment-item');

            const authorPara = document.createElement('p');
            authorPara.classList.add('comment-author');
            authorPara.innerHTML = `Anonymous User <span class="comment-date">${new Date().toLocaleDateString()}</span>`;

            const textPara = document.createElement('p');
            textPara.classList.add('comment-text');
            textPara.textContent = commentText;

            newCommentDiv.appendChild(authorPara);
            newCommentDiv.appendChild(textPara);

            commentsList.prepend(newCommentDiv);
            commentInput.value = '';
        }
    });

    // Function to update active states
    const updateActiveStates = (selectedIndex) => {
        // Update video playlist active state
        Array.from(videoPlaylist.children).forEach((item, index) => {
            if (index === selectedIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update video notes playlist active state
        Array.from(videoNotesList.children).forEach((item, index) => {
            if (index === selectedIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    };

    // Handle video playlist selection
    videoPlaylist.addEventListener('click', (event) => {
        let listItem = event.target.closest('li');

        if (listItem && listItem.hasAttribute('data-video-url')) {
            const videoUrl = listItem.getAttribute('data-video-url');
            const videoTitle = listItem.getAttribute('data-video-title');
            const videoIndex = Array.from(videoPlaylist.children).indexOf(listItem); // Get the index of the clicked video

            mainVideoPlayer.src = videoUrl;
            currentVideoTitle.innerHTML = `${videoTitle} <span style="color: #1cd400;"></span>`; // Update the title

            updateActiveStates(videoIndex); // Update active states for both playlists
        }
    });

    // Handle initial active state
    const initialActiveVideo = videoPlaylist.querySelector('.active');
    if (initialActiveVideo) {
        const initialIndex = Array.from(videoPlaylist.children).indexOf(initialActiveVideo);
        updateActiveStates(initialIndex);
    }
});