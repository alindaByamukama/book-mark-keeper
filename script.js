const modal = document.getElementById('modal')
const modalShow = document.getElementById('show-modal')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('bookmark-form') 
const websiteNameEl = document.getElementById('website-name')
const websiteUrlEl = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')

let bookmarks = []

// show modal, focus on input
function showModal() {
    modal.classList.add('show-modal')
    websiteNameEl.focus()
}

// validate form
function validate(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
    const regex = new RegExp(expression)
    if (!nameValue || !urlValue) {
        alert('Please submit values for both fields.')
    }
    // if (urlValue.match(regex)) {
    //     alert('match!')
    // }
    if (!urlValue.match(regex)) {
        alert('Please provide a valid website address')
        return false
    }
    // valid
    return true
}

// fetch bookmarks from local sotrage
function fetchBookmarks() {
    // get bookmarks if available
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    } else {
        // create bookmarks array in local storage
        bookmarks = [
            {
                name: 'Jacinto Design',
                url: 'https://jacinto.design',
            },
        ]
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))          
    }
    console.log(bookmarks)
}

// handle data from form
function storeBookmark(e) {
    e.preventDefault()
    const nameValue = websiteNameEl.value 
    let urlValue = websiteUrlEl.value
    if (!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`
    }
    // console.log(nameValue, urlValue)
    if (!validate(nameValue, urlValue)) {
        return false
    }
    const bookmark = {
        name: nameValue,
        url: urlValue,
    }
    bookmarks.push(bookmark)
    // console.log(JSON.stringify(bookmarks))
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    fetchBookmarks()
    bookmarkForm.reset()
    websiteNameEl.focus()
}

// modal event listenenrs
modalShow.addEventListener('click', showModal)
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'))
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false))

// event listener
bookmarkForm.addEventListener('submit', storeBookmark)

// on load, fetch bookmarks
fetchBookmarks()