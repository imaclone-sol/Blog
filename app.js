const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = [/* Your Contract ABI here */];

const blogContract = new ethers.Contract(contractAddress, contractABI, signer);

async function createPost() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    try {
        const tx = await blogContract.createPost(title, content);
        await tx.wait();
        loadPosts();
    } catch (error) {
        console.error(error);
    }
}

async function loadPosts() {
    const postCount = await blogContract.getPostCount();
    let html = '';
    for (let i = 0; i < postCount; i++) {
        const post = await blogContract.getPost(i);
        html += `<h3>${post.title}</h3><p>${post.content}</p>`;
    }
    document.getElementById('posts').innerHTML = html;
}

window.onload = () => {
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.request({ method: 'eth_requestAccounts' });
        loadPosts();
    } else {
        alert("Please install MetaMask!");
    }
};