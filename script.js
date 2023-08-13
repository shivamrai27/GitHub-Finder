const searchBtnEl = document.getElementById('searchBtn');
const checkProfileBtnEl = document.getElementById('searchBtn');

const getUserName = document.getElementById('searchInput');
const profileContainerEl = document.getElementById('profileContainer');
const loadingEl = document.getElementById('loading');

const avatar = document.getElementById('img');
const Thename = document.getElementById('name');
const userName = document.getElementById('userName');
const generateProfile = (profile) => {
    return (
        `   
        <div class="profile-card">
        <div class="top-section">
            <div class="left">
                <div class="avatar">
                <img id='img' src="${profile.avatar_url}">
                </div>
                <div class="self">
                    <h1 id="name">${profile.name}</h1>
                    <h1 id="username">${profile.login}</h1>
                </div>
            </div>
            <a href="${profile.repo_url}">
            <button id="searchBtn">Check Profile</button>

            </a>
        </div>
        <div class="about">
            <h2>About</h2>
            <p>${profile.bio}</p>
        </div>
        <div class="status">
            <div class="status-item">
                <h3>Followers</h3>
                <p>${profile.followers}</p>
            </div>
            <div class="status-item">
                <h3>Following</h3>
                <p>${profile.following}</p>
            </div>
            <div class="status-item">
                <h3>Repos</h3>
                <p>${profile.public_repos}</p>
            </div>
        </div>
    </div>`
    )
}
const url = 'https://api.github.com/users/'

const fetchProfile = async () => {
    loadingEl.innerText = 'Loading.....';
    loadingEl.style.color = "black";
    try {
        const res = await fetch(`${url}${getUserName.value}`);
        const data = await res.json();
        if (data.bio) {
            loadingEl.innerText = ""
            profileContainerEl.innerHTML = generateProfile(data);
        } else {
            loadingEl.innerHTML = data.message;
            loadingEl.style.color = "red"
            profileContainerEl.innerText = "";
        }
        // console.log(data);
        // console.log(userName.value);

        avatar.src = "`${data.avatar}`"
        Thename.innerHTML = data.name;

    }
    catch (error) {
        loadingEl.innerText = ""
        console.log(error);
    }
}
// fetchProfile();

searchBtnEl.addEventListener('click', fetchProfile);
