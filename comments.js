document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('comment-form').addEventListener('submit', handleCommentSubmit);
    loadComments();
});

function handleCommentSubmit(event) {
    event.preventDefault();

    const username = document.getElementById('username').value || 'Anonymous';
    const email = document.getElementById('email').value;
    const comment = document.getElementById('comment').value;

    const commentData = {
        username,
        email,
        comment,
        timestamp: new Date().toISOString()
    };

    saveComment(commentData);
    displayComment(commentData);
    event.target.reset();
}

function saveComment(comment) {
    const comments = getComments();
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
}

function getComments() {
    return JSON.parse(localStorage.getItem('comments')) || [];
}

function loadComments() {
    const comments = getComments();
    comments.forEach(displayComment);
}

function displayComment(comment) {
    const commentList = document.getElementById('comment-list');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <strong>${comment.username}</strong> (${comment.email}) <br>
        <small>${new Date(comment.timestamp).toLocaleString()}</small>
        <p>${comment.comment}</p>
    `;
    commentList.appendChild(listItem);
}
