//your code here
const imgClick = document.getElementById('imageContainer');
const h = document.getElementById('h');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const para = document.getElementById('para');

let selectedImages = [];
let shuffledImages = [];
const imageSource = [ "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg"	
];
function shuffleAndDisplayImages(){
	const duplicateIndex = Math.floor(Math.random() * imageSource.length);
	const duplicateImage = imageSource[duplicateIndex];

shuffledImages = [...imageSource, duplicateImage];
shuffledImages.sort(()=> Math.random() - 0.5);

imageContainer.innerHTML = '';
shuffledImages.forEach((src, index) => {
	const img = document.createElement('img');
	img.src = src;
	img.classList.add('tile');
	img.setAttribute('data-index', index);
	img.addEventListener('click', handleTileClick);
	imageContainer.appendChild(img);
});
}
function handleTileClick(e){
	const img = e.target;
	const index = img.getAttribute('data-index');
	if(selectedImages.length === 2 || img.classList.contains('selected')){
		return;
	}
	img.classList.add('selected');
	selectedImages.push({index, src: img.src});
	
	resetButton.style.display = 'inline-block';
	if(selectedImages.length === 2){
		verifyButton.style.display = 'inline-block';
	}
}
function resetState(){
	selectedImages = [];
	h.textContent = "Please click on the identical tiles to verify that you are not a robot.";
	para.textContent = "";
	verifyButton.style.display = "none";
	resetButton.style.display = "none";
	const allTiles = document.querySelectorAll('.tile');
	allTiles.forEach(tile => tile.classList.remove('selected'));
}
function verifyImages(){
	if(selectedImages.length !== 2) return;

	if(selectedImages[0].src === selectedImages[1].src){
		para.textContent = "You are a human. Congratulations!";
	}else{
		para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
	}
	verifyButton.style.display = 'none';
}
resetButton.addEventListener('click', resetState);
verifyButton.addEventListener('click', verifyImages);

shuffleAndDisplayImages();