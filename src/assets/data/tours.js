import tourImg01 from "../images/product1.jpg";
import tourImg02 from "../images/product2.jpg";
import tourImg03 from "../images/product3.jpeg";
import tourImg04 from "../images/product4.jpeg";
import tourImg05 from "../images/product5.jpg";
import tourImg06 from "../images/product6.jpg";
import tourImg07 from "../images/product7.jpg";
import tourImg08 from "../images/product8.jpeg";

const tours = [
  { 
    id: "01",
    title: "Nuevo BMW Serie 4 G22",
    city: "Jawa Selatan",
    category: "Mobil",
    price: 300000,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
      {
        name: "jhon doe",
        rating: 5,
      },
    ],
    avgRating: 4.5,
    photo: tourImg01,
    featured: true,
  },
  {
    id: "02",
    title: "Honda Astrea Grand 1991",
    city: "Sumatera Tenggara",
    category: "Motor",
    price: 120000,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg02,
    featured: false,
  },
  {
    id: "03",
    title: "Iphone XS Max",
    city: "Jawa Timur",
    category: "Handphone",
    price: 50000,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg03,
    featured: true,
  },
  {
    id: "04",
    title: "Kursi Lipat Dhaulagiri",
    city: "Papua",
    category: "Kursi",
    price: 10000,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg04,
    featured: true,
  },
  {
    id: "05",
    title: "PlayStation 5",
    city: "Jawa Timur",
    category: "PlayStation",
    price: 50000,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg05,
    featured: false,
  },
  {
    id: "06",
    title: "Civic Hacthback",
    city: "Jawa Tengah",
    category: "Mobil",
    price: 300000,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg06,
    featured: false,
  },
  {
    id: "07",
    title: "Sony ZV-E10",
    city: "Jaw Barat",
    category: "Kamera",
    price: 200000,
    desc: "this is the description",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg07,
    featured: true,
  },
  {
    id: "08",
    title: "Eiger X-Hornbill",
    city: "Thailand",
    category: "Tenda",
    price: 75000,
    desc: "this is the description",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg08,
    featured: true,
  },
  {
  id: "08",
    title: "Civic bro",
    city: "Jawa Tengah",
    category: "Mobil",
    price: 300000,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg06,
    featured: false,
  },
  {
    id: "10",
      title: "Civic bro",
      city: "Jawa Tengah",
      category: "Mobil",
      price: 300000,
      desc: "this is the description",
      reviews: [
        {
          name: "jhon doe",
          rating: 4.6,
        },
      ],
      avgRating: 4.5,
      photo: tourImg06,
      featured: false,
    },
    {
      id: "10",
        title: "Civic bro",
        city: "Jawa Tengah",
        category: "Mobil",
        price: 300000,
        desc: "this is the description",
        reviews: [
          {
            name: "jhon doe",
            rating: 4.6,
          },
        ],
        avgRating: 4.5,
        photo: tourImg06,
        featured: false,
      }
];

export default tours;
