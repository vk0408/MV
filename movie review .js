const movies = {
  inception: {
    title: "Inception",
    image: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
    desc: "A thief who steals corporate secrets through dream-sharing technology.",
    link: "https://www.imdb.com/title/tt1375666/"
  },
  interstellar: {
    title: "Interstellar",
    image: "https://m.media-amazon.com/images/I/71y7U3QNyGL._AC_SY679_.jpg",
    desc: "A team travels through a wormhole in space in an attempt to save humanity.",
    link: "https://www.imdb.com/title/tt0816692/"
  },
  joker: {
    title: "Joker",
    image: "https://m.media-amazon.com/images/I/71R1sZ6YgfL._AC_SY679_.jpg",
    desc: "A failed comedian descends into madness and becomes the Joker.",
    link: "https://www.imdb.com/title/tt7286456/"
  },
  avatar: {
    title: "Avatar",
    image: "https://m.media-amazon.com/images/I/41kTVLeW1CL._AC_.jpg",
    desc: "A marine on an alien planet becomes part of the native tribe.",
    link: "https://www.imdb.com/title/tt0499549/"
  },
  darkKnight: {
    title: "The Dark Knight",
    image: "https://m.media-amazon.com/images/I/51NbVEuw1HL._AC_.jpg",
    desc: "Batman faces the Joker in a battle for Gotham's soul.",
    link: "https://www.imdb.com/title/tt0468569/"
  },
  godfather: {
    title: "The Godfather",
    image: "https://m.media-amazon.com/images/I/51rGGYf8nGL._AC_.jpg",
    desc: "The aging patriarch of an organized crime dynasty transfers control to his son.",
    link: "https://www.imdb.com/title/tt0068646/"
  },
  parasite: {
    title: "Parasite",
    image: "https://m.media-amazon.com/images/I/91Pp+QYFffL._AC_SL1500_.jpg",
    desc: "A poor family schemes to become employed by a wealthy family.",
    link: "https://www.imdb.com/title/tt6751668/"
  },
  shawshank: {
    title: "The Shawshank Redemption",
    image: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg",
    desc: "Two imprisoned men bond over years, finding hope and redemption.",
    link: "https://www.imdb.com/title/tt0111161/"
  },
  endgame: {
    title: "Avengers: Endgame",
    image: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SL1500_.jpg",
    desc: "The Avengers assemble once more to reverse Thanos' actions.",
    link: "https://www.imdb.com/title/tt4154796/"
  },
  spiderman: {
    title: "Spider-Man: No Way Home",
    image: "https://m.media-amazon.com/images/I/81r+LN3F3cL._AC_SL1500_.jpg",
    desc: "Peter Parker seeks help to erase his identity being revealed.",
    link: "https://www.imdb.com/title/tt10872600/"
  }
};

window.onload = function () {
  loadReviews();
};

function fillMovieDetails() {
  const selected = document.getElementById("movieSelect").value;
  const preview = document.getElementById("moviePreview");
  const poster = document.getElementById("previewPoster");
  const desc = document.getElementById("previewDesc");

  if (selected && movies[selected]) {
    poster.src = movies[selected].image;
    desc.textContent = movies[selected].desc;
    preview.style.display = "block";
  } else {
    preview.style.display = "none";
  }
}

function addReview() {
  const movieKey = document.getElementById("movieSelect").value;
  const rating = document.getElementById("movieRating").value;
  const reviewText = document.getElementById("movieReview").value.trim();

  if (!movieKey || !reviewText) {
    alert("Please select a movie and write your review.");
    return;
  }

  const { title, image, desc, link } = movies[movieKey];
  const review = { title, image, desc, link, rating, reviewText };

  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.unshift(review);
  localStorage.setItem("reviews", JSON.stringify(reviews));

  displayReview(review, 0);
  document.getElementById("movieReview").value = "";
}

function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.forEach((r, i) => displayReview(r, i));
}

function displayReview({ title, image, desc, link, rating, reviewText }, index) {
  const reviewList = document.getElementById("reviewList");

  const card = document.createElement("div");
  card.className = "review-card";

  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  const closeBtn = document.createElement("span");
  closeBtn.className = "close-btn";
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = () => {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.splice(index, 1);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    reviewList.innerHTML = "";
    loadReviews();
  };

  card.innerHTML = `
    <div class="card-content">
      <img src="${image}" class="poster" />
      <div class="details">
        <h3>${title}</h3>
        <a href="${link}" target="_blank" class="imdb-link">IMDb Page</a>
        <p class="desc">${desc}</p>
        <div class="stars">${stars}</div>
        <p>${reviewText}</p>
      </div>
    </div>
  `;

  card.prepend(closeBtn);
  reviewList.appendChild(card);
}

function clearReviews() {
  if (confirm("Are you sure you want to delete all reviews?")) {
    localStorage.removeItem("reviews");
    document.getElementById("reviewList").innerHTML = "";
  }
}