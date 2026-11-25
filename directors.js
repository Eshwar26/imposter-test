/* ════════════════════════════════════════════════════════════════
   CINEFIED · DIRECTORS
   One entry per director. Their movies are NOT listed here: games find
   them through the director field in movies.js, so the name below must
   match that field exactly.

   A director needs 3+ movies in movies.js to appear in Director's Cut,
   and 2+ to appear in Heads Up, Blindspot and Imposter.
   id: never change it, never reuse it.
   ════════════════════════════════════════════════════════════════ */
(function (root) {
  const DIRECTORS = [
    { id: 'a-karunakaran', name: 'A. Karunakaran' },
    { id: 'a-kodandarami-reddy', name: 'A. Kodandarami Reddy' },   // 2 movies: not in Director's Cut yet
    { id: 'a-r-murugadoss', name: 'A. R. Murugadoss' },
    { id: 'a-s-ravikumar-chowdary', name: 'A. S. Ravikumar Chowdary' },   // 1 movie: not in Director's Cut yet
    { id: 'ajay-bhupathi', name: 'Ajay Bhupathi' },
    { id: 'alphonse-puthren', name: 'Alphonse Puthren' },   // 1 movie: not in Director's Cut yet
    { id: 'anand-ranga', name: 'Anand Ranga' },   // 1 movie: not in Director's Cut yet
    { id: 'anil-ravipudi', name: 'Anil Ravipudi' },
    { id: 'anudeep-k-v', name: 'Anudeep K. V.' },
    { id: 'apoorva-lakhia', name: 'Apoorva Lakhia' },   // 2 movies: not in Director's Cut yet
    { id: 'ayan-mukerji', name: 'Ayan Mukerji' },   // 1 movie: not in Director's Cut yet
    { id: 'b-gopal', name: 'B. Gopal' },   // 2 movies: not in Director's Cut yet
    { id: 'b-v-nandini-reddy', name: 'B. V. Nandini Reddy' },   // 1 movie: not in Director's Cut yet
    { id: 'bharat-kamma', name: 'Bharat Kamma' },   // 1 movie: not in Director's Cut yet
    { id: 'bhaskar', name: 'Bhaskar' },
    { id: 'bhimaneni-srinivasa-rao', name: 'Bhimaneni Srinivasa Rao' },   // 2 movies: not in Director's Cut yet
    { id: 'bobby-kolli', name: 'Bobby Kolli' },
    { id: 'boyapati-srinu', name: 'Boyapati Srinu' },
    { id: 'buchi-babu-sana', name: 'Buchi Babu Sana' },   // 2 movies: not in Director's Cut yet
    { id: 'chandoo-mondeti', name: 'Chandoo Mondeti' },
    { id: 'dasaradh', name: 'Dasaradh' },   // 2 movies: not in Director's Cut yet
    { id: 'dharani', name: 'Dharani' },   // 1 movie: not in Director's Cut yet
    { id: 'e-v-v-satyanarayana', name: 'E. V. V. Satyanarayana' },   // 2 movies: not in Director's Cut yet
    { id: 'gautham-vasudev-menon', name: 'Gautham Vasudev Menon' },   // 2 movies: not in Director's Cut yet
    { id: 'gopichand-malineni', name: 'Gopichand Malineni' },
    { id: 'gowtam-tinnanuri', name: 'Gowtam Tinnanuri' },
    { id: 'gunasekhar', name: 'Gunasekhar' },
    { id: 'hanu-raghavapudi', name: 'Hanu Raghavapudi' },
    { id: 'hari', name: 'Hari' },
    { id: 'harish-shankar', name: 'Harish Shankar' },
    { id: 'jayanth-c-paranjee', name: 'Jayanth C. Paranjee' },
    { id: 'jyothi-krishna', name: 'Jyothi Krishna' },   // 1 movie: not in Director's Cut yet
    { id: 'k-raghavendra-rao', name: 'K. Raghavendra Rao' },
    { id: 'k-s-ravikumar', name: 'K. S. Ravikumar' },   // 2 movies: not in Director's Cut yet
    { id: 'k-vijaya-bhaskar', name: 'K. Vijaya Bhaskar' },
    { id: 'k-viswanath', name: 'K. Viswanath' },   // 1 movie: not in Director's Cut yet
    { id: 'kalyan-krishna', name: 'Kalyan Krishna' },
    { id: 'kalyan-shankar', name: 'Kalyan Shankar' },   // 1 movie: not in Director's Cut yet
    { id: 'karthik-gattamneni', name: 'Karthik Gattamneni' },   // 1 movie: not in Director's Cut yet
    { id: 'karthik-subbaraj', name: 'Karthik Subbaraj' },   // 1 movie: not in Director's Cut yet
    { id: 'karthik-varma-dandu', name: 'Karthik Varma Dandu' },   // 1 movie: not in Director's Cut yet
    { id: 'kishore-kumar-pardasany', name: 'Kishore Kumar Pardasany' },   // 2 movies: not in Director's Cut yet
    { id: 'kishore-tirumala', name: 'Kishore Tirumala' },   // 2 movies: not in Director's Cut yet
    { id: 'kodi-ramakrishna', name: 'Kodi Ramakrishna' },   // 1 movie: not in Director's Cut yet
    { id: 'koratala-siva', name: 'Koratala Siva' },
    { id: 'kranthi-madhav', name: 'Kranthi Madhav' },   // 1 movie: not in Director's Cut yet
    { id: 'krish-jagarlamudi', name: 'Krish Jagarlamudi' },
    { id: 'krishna-vamsi', name: 'Krishna Vamsi' },
    { id: 'lokesh-kanagaraj', name: 'Lokesh Kanagaraj' },   // 2 movies: not in Director's Cut yet
    { id: 'mallidi-vassishta', name: 'Mallidi Vassishta' },   // 1 movie: not in Director's Cut yet
    { id: 'mallik-ram', name: 'Mallik Ram' },   // 1 movie: not in Director's Cut yet
    { id: 'mani-ratnam', name: 'Mani Ratnam' },   // 1 movie: not in Director's Cut yet
    { id: 'maruthi', name: 'Maruthi' },
    { id: 'meher-ramesh', name: 'Meher Ramesh' },
    { id: 'mohan-krishna-indraganti', name: 'Mohan Krishna Indraganti' },
    { id: 'mohan-raja', name: 'Mohan Raja' },   // 1 movie: not in Director's Cut yet
    { id: 'mukesh-kumar-singh', name: 'Mukesh Kumar Singh' },   // 1 movie: not in Director's Cut yet
    { id: 'muthyala-subbaiah', name: 'Muthyala Subbaiah' },   // 2 movies: not in Director's Cut yet
    { id: 'nag-ashwin', name: 'Nag Ashwin' },
    { id: 'nelson-dilipkumar', name: 'Nelson Dilipkumar' },   // 2 movies: not in Director's Cut yet
    { id: 'om-raut', name: 'Om Raut' },   // 1 movie: not in Director's Cut yet
    { id: 'p-a-arun-prasad', name: 'P. A. Arun Prasad' },   // 1 movie: not in Director's Cut yet
    { id: 'pa-ranjith', name: 'Pa. Ranjith' },   // 2 movies: not in Director's Cut yet
    { id: 'parasuram', name: 'Parasuram' },
    { id: 'pawan-kalyan', name: 'Pawan Kalyan' },   // 1 movie: not in Director's Cut yet
    { id: 'prabhu-deva', name: 'Prabhu Deva' },   // 2 movies: not in Director's Cut yet
    { id: 'prasanth-varma', name: 'Prasanth Varma' },
    { id: 'prashanth-neel', name: 'Prashanth Neel' },
    { id: 'puri-jagannadh', name: 'Puri Jagannadh' },
    { id: 'radha-krishna-kumar', name: 'Radha Krishna Kumar' },   // 1 movie: not in Director's Cut yet
    { id: 'radha-mohan', name: 'Radha Mohan' },   // 1 movie: not in Director's Cut yet
    { id: 'raghava-lawrence', name: 'Raghava Lawrence' },   // 1 movie: not in Director's Cut yet
    { id: 'rahul-ravindran', name: 'Rahul Ravindran' },   // 1 movie: not in Director's Cut yet
    { id: 'rahul-sankrityan', name: 'Rahul Sankrityan' },   // 2 movies: not in Director's Cut yet
    { id: 'ram-gopal-varma', name: 'Ram Gopal Varma' },
    { id: 'ramesh-varma', name: 'Ramesh Varma' },   // 1 movie: not in Director's Cut yet
    { id: 'ravikanth-perepu', name: 'Ravikanth Perepu' },   // 1 movie: not in Director's Cut yet
    { id: 'ritesh-rana', name: 'Ritesh Rana' },   // 2 movies: not in Director's Cut yet
    { id: 's-j-suryah', name: 'S. J. Suryah' },   // 1 movie: not in Director's Cut yet
    { id: 's-s-rajamouli', name: 'S. S. Rajamouli' },
    { id: 'saagar-k-chandra', name: 'Saagar K. Chandra' },   // 1 movie: not in Director's Cut yet
    { id: 'sai-rajesh', name: 'Sai Rajesh' },   // 1 movie: not in Director's Cut yet
    { id: 'sailesh-kolanu', name: 'Sailesh Kolanu' },
    { id: 'sampath-nandi', name: 'Sampath Nandi' },   // 1 movie: not in Director's Cut yet
    { id: 'samuthirakani', name: 'Samuthirakani' },   // 1 movie: not in Director's Cut yet
    { id: 'sandeep-raj', name: 'Sandeep Raj' },   // 1 movie: not in Director's Cut yet
    { id: 'sandeep-reddy-vanga', name: 'Sandeep Reddy Vanga' },
    { id: 'santosh-srinivas', name: 'Santosh Srinivas' },   // 2 movies: not in Director's Cut yet
    { id: 'sashi-kiran-tikka', name: 'Sashi Kiran Tikka' },   // 2 movies: not in Director's Cut yet
    { id: 'satyadev', name: 'Satyadev' },   // 1 movie: not in Director's Cut yet
    { id: 'sekhar-kammula', name: 'Sekhar Kammula' },
    { id: 'shankar', name: 'Shankar' },
    { id: 'shiva-nirvana', name: 'Shiva Nirvana' },
    { id: 'shouryuv', name: 'Shouryuv' },   // 1 movie: not in Director's Cut yet
    { id: 'sobhan', name: 'Sobhan' },   // 1 movie: not in Director's Cut yet
    { id: 'sreenu-vaitla', name: 'Sreenu Vaitla' },
    { id: 'srikanth-addala', name: 'Srikanth Addala' },
    { id: 'srikanth-odela', name: 'Srikanth Odela' },   // 2 movies: not in Director's Cut yet
    { id: 'srinivasa-reddy', name: 'Srinivasa Reddy' },   // 1 movie: not in Director's Cut yet
    { id: 'sripriya', name: 'Sripriya' },   // 1 movie: not in Director's Cut yet
    { id: 'sriram-aditya', name: 'Sriram Aditya' },   // 1 movie: not in Director's Cut yet
    { id: 'srivas', name: 'Srivas' },   // 1 movie: not in Director's Cut yet
    { id: 'sriwass', name: 'Sriwass' },   // 1 movie: not in Director's Cut yet
    { id: 'subbu', name: 'Subbu' },   // 1 movie: not in Director's Cut yet
    { id: 'sujeeth', name: 'Sujeeth' },
    { id: 'sukumar', name: 'Sukumar' },
    { id: 'surender-reddy', name: 'Surender Reddy' },
    { id: 'suresh-krissna', name: 'Suresh Krissna' },
    { id: 'swaroop-rsj', name: 'Swaroop RSJ' },   // 1 movie: not in Director's Cut yet
    { id: 't-j-gnanavel', name: 'T. J. Gnanavel' },   // 1 movie: not in Director's Cut yet
    { id: 'teja', name: 'Teja' },
    { id: 'tharun-bhascker', name: 'Tharun Bhascker' },   // 2 movies: not in Director's Cut yet
    { id: 'trinadha-rao-nakkina', name: 'Trinadha Rao Nakkina' },   // 2 movies: not in Director's Cut yet
    { id: 'trivikram-srinivas', name: 'Trivikram Srinivas' },
    { id: 'v-i-anand', name: 'V. I. Anand' },   // 1 movie: not in Director's Cut yet
    { id: 'v-v-vinayak', name: 'V. V. Vinayak' },
    { id: 'vakkantham-vamsi', name: 'Vakkantham Vamsi' },   // 1 movie: not in Director's Cut yet
    { id: 'vamsee', name: 'Vamsee' },   // 1 movie: not in Director's Cut yet
    { id: 'vamshi-paidipally', name: 'Vamshi Paidipally' },
    { id: 'veera-shankar', name: 'Veera Shankar' },   // 1 movie: not in Director's Cut yet
    { id: 'veerabhadram', name: 'Veerabhadram' },   // 1 movie: not in Director's Cut yet
    { id: 'veeru-potla', name: 'Veeru Potla' },   // 1 movie: not in Director's Cut yet
    { id: 'venkat-prabhu', name: 'Venkat Prabhu' },   // 1 movie: not in Director's Cut yet
    { id: 'venkat-ramji', name: 'Venkat Ramji' },   // 1 movie: not in Director's Cut yet
    { id: 'venky-atluri', name: 'Venky Atluri' },
    { id: 'venky-kudumula', name: 'Venky Kudumula' },   // 1 movie: not in Director's Cut yet
    { id: 'venu-sriram', name: 'Venu Sriram' },   // 2 movies: not in Director's Cut yet
    { id: 'vijay-binni', name: 'Vijay Binni' },   // 1 movie: not in Director's Cut yet
    { id: 'vijay-kumar-konda', name: 'Vijay Kumar Konda' },   // 1 movie: not in Director's Cut yet
    { id: 'vikram-kumar', name: 'Vikram Kumar' },
    { id: 'vikram-sirikonda', name: 'Vikram Sirikonda' },   // 1 movie: not in Director's Cut yet
    { id: 'vimal-krishna', name: 'Vimal Krishna' },   // 1 movie: not in Director's Cut yet
    { id: 'virinchi-varma', name: 'Virinchi Varma' },   // 1 movie: not in Director's Cut yet
    { id: 'vishnuvardhan', name: 'Vishnuvardhan' },   // 1 movie: not in Director's Cut yet
    { id: 'vivek-athreya', name: 'Vivek Athreya' },
    { id: 'yogi', name: 'Yogi' },   // 1 movie: not in Director's Cut yet
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = DIRECTORS; else root.CinefiedDirectors = DIRECTORS;
})(typeof self !== 'undefined' ? self : this);
