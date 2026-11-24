/* ════════════════════════════════════════════════════════════════
   CINEFIED · DIRECTORS
   One entry per director. Their movies are NOT listed here: games find
   them through the director field in movies.js, so the name below must
   match that field exactly.

   level = how well known the director is: 'easy' 'medium' 'hard'
   (first guesses: adjust freely).
   A director needs 3+ movies in movies.js to appear in Director's Cut.
   id: never change it, never reuse it.
   ════════════════════════════════════════════════════════════════ */
(function (root) {
  const DIRECTORS = [
    { id: 'a-karunakaran', name: 'A. Karunakaran', level: 'medium' },
    { id: 'a-kodandarami-reddy', name: 'A. Kodandarami Reddy', level: 'medium' },   // 2 movies: not in Director's Cut yet
    { id: 'a-r-murugadoss', name: 'A. R. Murugadoss', level: 'easy' },
    { id: 'a-s-ravikumar-chowdary', name: 'A. S. Ravikumar Chowdary', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'ajay-bhupathi', name: 'Ajay Bhupathi', level: 'medium' },
    { id: 'alphonse-puthren', name: 'Alphonse Puthren', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'anand-ranga', name: 'Anand Ranga', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'anil-ravipudi', name: 'Anil Ravipudi', level: 'easy' },
    { id: 'anudeep-k-v', name: 'Anudeep K. V.', level: 'medium' },
    { id: 'apoorva-lakhia', name: 'Apoorva Lakhia', level: 'hard' },   // 2 movies: not in Director's Cut yet
    { id: 'ayan-mukerji', name: 'Ayan Mukerji', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'b-gopal', name: 'B. Gopal', level: 'medium' },   // 2 movies: not in Director's Cut yet
    { id: 'b-v-nandini-reddy', name: 'B. V. Nandini Reddy', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'bharat-kamma', name: 'Bharat Kamma', level: 'medium' },   // 1 movie: not in Director's Cut yet
    { id: 'bhaskar', name: 'Bhaskar', level: 'medium' },
    { id: 'bhimaneni-srinivasa-rao', name: 'Bhimaneni Srinivasa Rao', level: 'hard' },   // 2 movies: not in Director's Cut yet
    { id: 'bobby-kolli', name: 'Bobby Kolli', level: 'easy' },
    { id: 'boyapati-srinu', name: 'Boyapati Srinu', level: 'easy' },
    { id: 'buchi-babu-sana', name: 'Buchi Babu Sana', level: 'medium' },   // 2 movies: not in Director's Cut yet
    { id: 'chandoo-mondeti', name: 'Chandoo Mondeti', level: 'medium' },
    { id: 'dasaradh', name: 'Dasaradh', level: 'medium' },   // 2 movies: not in Director's Cut yet
    { id: 'dharani', name: 'Dharani', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'e-v-v-satyanarayana', name: 'E. V. V. Satyanarayana', level: 'medium' },   // 2 movies: not in Director's Cut yet
    { id: 'gautham-vasudev-menon', name: 'Gautham Vasudev Menon', level: 'medium' },   // 2 movies: not in Director's Cut yet
    { id: 'gopichand-malineni', name: 'Gopichand Malineni', level: 'medium' },
    { id: 'gowtam-tinnanuri', name: 'Gowtam Tinnanuri', level: 'medium' },
    { id: 'gunasekhar', name: 'Gunasekhar', level: 'easy' },
    { id: 'hanu-raghavapudi', name: 'Hanu Raghavapudi', level: 'medium' },
    { id: 'hari', name: 'Hari', level: 'medium' },
    { id: 'harish-shankar', name: 'Harish Shankar', level: 'easy' },
    { id: 'jayanth-c-paranjee', name: 'Jayanth C. Paranjee', level: 'hard' },
    { id: 'jyothi-krishna', name: 'Jyothi Krishna', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'k-raghavendra-rao', name: 'K. Raghavendra Rao', level: 'easy' },
    { id: 'k-s-ravikumar', name: 'K. S. Ravikumar', level: 'medium' },   // 2 movies: not in Director's Cut yet
    { id: 'k-vijaya-bhaskar', name: 'K. Vijaya Bhaskar', level: 'hard' },
    { id: 'k-viswanath', name: 'K. Viswanath', level: 'medium' },   // 1 movie: not in Director's Cut yet
    { id: 'kalyan-krishna', name: 'Kalyan Krishna', level: 'medium' },
    { id: 'kalyan-shankar', name: 'Kalyan Shankar', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'karthik-gattamneni', name: 'Karthik Gattamneni', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'karthik-subbaraj', name: 'Karthik Subbaraj', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'karthik-varma-dandu', name: 'Karthik Varma Dandu', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'kishore-kumar-pardasany', name: 'Kishore Kumar Pardasany', level: 'hard' },   // 2 movies: not in Director's Cut yet
    { id: 'kishore-tirumala', name: 'Kishore Tirumala', level: 'medium' },   // 2 movies: not in Director's Cut yet
    { id: 'kodi-ramakrishna', name: 'Kodi Ramakrishna', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'koratala-siva', name: 'Koratala Siva', level: 'easy' },
    { id: 'kranthi-madhav', name: 'Kranthi Madhav', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'krish-jagarlamudi', name: 'Krish Jagarlamudi', level: 'easy' },
    { id: 'krishna-vamsi', name: 'Krishna Vamsi', level: 'easy' },
    { id: 'lokesh-kanagaraj', name: 'Lokesh Kanagaraj', level: 'easy' },   // 2 movies: not in Director's Cut yet
    { id: 'mallidi-vassishta', name: 'Mallidi Vassishta', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'mallik-ram', name: 'Mallik Ram', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'mani-ratnam', name: 'Mani Ratnam', level: 'easy' },   // 1 movie: not in Director's Cut yet
    { id: 'maruthi', name: 'Maruthi', level: 'medium' },
    { id: 'meher-ramesh', name: 'Meher Ramesh', level: 'medium' },
    { id: 'mohan-krishna-indraganti', name: 'Mohan Krishna Indraganti', level: 'medium' },
    { id: 'mohan-raja', name: 'Mohan Raja', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'mukesh-kumar-singh', name: 'Mukesh Kumar Singh', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'muthyala-subbaiah', name: 'Muthyala Subbaiah', level: 'hard' },   // 2 movies: not in Director's Cut yet
    { id: 'nag-ashwin', name: 'Nag Ashwin', level: 'easy' },
    { id: 'nelson-dilipkumar', name: 'Nelson Dilipkumar', level: 'medium' },   // 2 movies: not in Director's Cut yet
    { id: 'om-raut', name: 'Om Raut', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'p-a-arun-prasad', name: 'P. A. Arun Prasad', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'pa-ranjith', name: 'Pa. Ranjith', level: 'medium' },   // 2 movies: not in Director's Cut yet
    { id: 'parasuram', name: 'Parasuram', level: 'medium' },
    { id: 'pawan-kalyan', name: 'Pawan Kalyan', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'prabhu-deva', name: 'Prabhu Deva', level: 'hard' },   // 2 movies: not in Director's Cut yet
    { id: 'prasanth-varma', name: 'Prasanth Varma', level: 'easy' },
    { id: 'prashanth-neel', name: 'Prashanth Neel', level: 'easy' },
    { id: 'puri-jagannadh', name: 'Puri Jagannadh', level: 'easy' },
    { id: 'radha-krishna-kumar', name: 'Radha Krishna Kumar', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'radha-mohan', name: 'Radha Mohan', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'raghava-lawrence', name: 'Raghava Lawrence', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'rahul-ravindran', name: 'Rahul Ravindran', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'rahul-sankrityan', name: 'Rahul Sankrityan', level: 'medium' },   // 2 movies: not in Director's Cut yet
    { id: 'ram-gopal-varma', name: 'Ram Gopal Varma', level: 'easy' },
    { id: 'ramesh-varma', name: 'Ramesh Varma', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'ravikanth-perepu', name: 'Ravikanth Perepu', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'ritesh-rana', name: 'Ritesh Rana', level: 'hard' },   // 2 movies: not in Director's Cut yet
    { id: 's-j-suryah', name: 'S. J. Suryah', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 's-s-rajamouli', name: 'S. S. Rajamouli', level: 'easy' },
    { id: 'saagar-k-chandra', name: 'Saagar K. Chandra', level: 'medium' },   // 1 movie: not in Director's Cut yet
    { id: 'sai-rajesh', name: 'Sai Rajesh', level: 'medium' },   // 1 movie: not in Director's Cut yet
    { id: 'sailesh-kolanu', name: 'Sailesh Kolanu', level: 'medium' },
    { id: 'sampath-nandi', name: 'Sampath Nandi', level: 'medium' },   // 1 movie: not in Director's Cut yet
    { id: 'samuthirakani', name: 'Samuthirakani', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'sandeep-raj', name: 'Sandeep Raj', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'sandeep-reddy-vanga', name: 'Sandeep Reddy Vanga', level: 'easy' },
    { id: 'santosh-srinivas', name: 'Santosh Srinivas', level: 'hard' },   // 2 movies: not in Director's Cut yet
    { id: 'sashi-kiran-tikka', name: 'Sashi Kiran Tikka', level: 'medium' },   // 2 movies: not in Director's Cut yet
    { id: 'satyadev', name: 'Satyadev', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'sekhar-kammula', name: 'Sekhar Kammula', level: 'easy' },
    { id: 'shankar', name: 'Shankar', level: 'easy' },
    { id: 'shiva-nirvana', name: 'Shiva Nirvana', level: 'medium' },
    { id: 'shouryuv', name: 'Shouryuv', level: 'medium' },   // 1 movie: not in Director's Cut yet
    { id: 'sobhan', name: 'Sobhan', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'sreenu-vaitla', name: 'Sreenu Vaitla', level: 'easy' },
    { id: 'srikanth-addala', name: 'Srikanth Addala', level: 'medium' },
    { id: 'srikanth-odela', name: 'Srikanth Odela', level: 'medium' },   // 2 movies: not in Director's Cut yet
    { id: 'srinivasa-reddy', name: 'Srinivasa Reddy', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'sripriya', name: 'Sripriya', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'sriram-aditya', name: 'Sriram Aditya', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'srivas', name: 'Srivas', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'sriwass', name: 'Sriwass', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'subbu', name: 'Subbu', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'sujeeth', name: 'Sujeeth', level: 'medium' },
    { id: 'sukumar', name: 'Sukumar', level: 'easy' },
    { id: 'surender-reddy', name: 'Surender Reddy', level: 'easy' },
    { id: 'suresh-krissna', name: 'Suresh Krissna', level: 'medium' },
    { id: 'swaroop-rsj', name: 'Swaroop RSJ', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 't-j-gnanavel', name: 'T. J. Gnanavel', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'teja', name: 'Teja', level: 'medium' },
    { id: 'tharun-bhascker', name: 'Tharun Bhascker', level: 'medium' },   // 2 movies: not in Director's Cut yet
    { id: 'trinadha-rao-nakkina', name: 'Trinadha Rao Nakkina', level: 'hard' },   // 2 movies: not in Director's Cut yet
    { id: 'trivikram-srinivas', name: 'Trivikram Srinivas', level: 'easy' },
    { id: 'v-i-anand', name: 'V. I. Anand', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'v-v-vinayak', name: 'V. V. Vinayak', level: 'easy' },
    { id: 'vakkantham-vamsi', name: 'Vakkantham Vamsi', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'vamsee', name: 'Vamsee', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'vamshi-paidipally', name: 'Vamshi Paidipally', level: 'easy' },
    { id: 'veera-shankar', name: 'Veera Shankar', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'veerabhadram', name: 'Veerabhadram', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'veeru-potla', name: 'Veeru Potla', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'venkat-prabhu', name: 'Venkat Prabhu', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'venkat-ramji', name: 'Venkat Ramji', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'venky-atluri', name: 'Venky Atluri', level: 'medium' },
    { id: 'venky-kudumula', name: 'Venky Kudumula', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'venu-sriram', name: 'Venu Sriram', level: 'medium' },   // 2 movies: not in Director's Cut yet
    { id: 'vijay-binni', name: 'Vijay Binni', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'vijay-kumar-konda', name: 'Vijay Kumar Konda', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'vikram-kumar', name: 'Vikram Kumar', level: 'medium' },
    { id: 'vikram-sirikonda', name: 'Vikram Sirikonda', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'vimal-krishna', name: 'Vimal Krishna', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'virinchi-varma', name: 'Virinchi Varma', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'vishnuvardhan', name: 'Vishnuvardhan', level: 'hard' },   // 1 movie: not in Director's Cut yet
    { id: 'vivek-athreya', name: 'Vivek Athreya', level: 'medium' },
    { id: 'yogi', name: 'Yogi', level: 'hard' },   // 1 movie: not in Director's Cut yet
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = DIRECTORS; else root.CinefiedDirectors = DIRECTORS;
})(typeof self !== 'undefined' ? self : this);
