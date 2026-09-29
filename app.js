console.log("Bismillah Praktikum Dimulai")

// AKTIVITAS 1 DOOM SELECTION / Seleksi Elemen
// Kenapa kita harus seleksi karena "menagkap" atau ambil id/class
// Mengambil elemen html tersebut lalu disimpan di variabel javascript

// 1. Mengambil elemen judul utama dan sub judul
// document.getelementById("...") mengambil berdasarkan atribut id

const judulUtama = document.getElementById("judul-utama"); //menangkap: <h1 id="judul-utama"

// document.querySelector("#...")
// tanda # artinya id

const subJudul = document.querySelector("#sub-judul"); //menangkap: <p id="sub-judul"

// 2. Mengambil elemen pada kartu 1 (Kartu manipulasi teks dan style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");

// 3. Mengambil elemen tombol-tombol aksi pada kartu 1
const BtnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

//4. Untuk mengambil elemen pada kartu 2 (Fitur Catatan Dinamis / To Do List Sederhana)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const pesanKosong = document.getElementById("pesan-kosong");

//5. Aktivitas ke 2 Manipulasi Teks & Style (Card 1)
// addEventListener("click", function() {...} artinya adalah Tolong dengarkan dulu/ tunggu
// sampai di klik user, jika di klik jalankan perintah di dalam function

//A. Mengubah teks dan warna secara langsung
BtnUbahTeks.addEventListener("click", function(){
    //.innerText = mengganti/mengisi secara langsung teks yang ada di elemen HTML
    teksPreview.innerText = "Hebat! Bangun Pagi";

    //.style.color = mengubah warna teks secara langsung (Inline Style)
    teksPreview.style.color = "#4138ee";

    //console.log = mencetak pesan di console browser
    console.log("Kelas Pagi!");
})

//B. Manipulasi Class CSS menggunakan classList.toggle()
btnToggleWarna.addEventListener("click", function(){
    //classList.toggle("nama-class") = fitur saklar otomatis (ON/OFF)
    boxPreview.classList.toggle("active-mode");
    cardManipulasi.classList.toggle("highlight");

    console.log("Berhasil Bangun Pagi")
})

//C. Mengembalikan (Reset) teks ke kondisi semula
btnReset.addEventListener("click", function (){
    //1. Kembalikan teks semula ke teks asli
    teksPreview.innerText = "Halo! Teks ini siap diubah oleh JavaScript "

    //2. Kosongkan warna agar kembali ke warna CSS bawaan
    teksPreview.style.color = ""

    //3. Hapus class khusus untuk menggunakan .classList.remove()
    boxPreview.classList.remove("active-mode")
    cardManipulasi.classList.remove("highlight")

    console.log("Tidur Lagi")
})

//Aktivitas 3 & 4 : Elemen dinamis dan Event Handling (To Do List Sederhana)
//Di aktivitas ini kita belajar elemen HTML baru (<li>) secara otomatis dalam JavaScript
//mengisi teksnya, memberi tombol hapus, lalu menempelkan ke layar (<ul>)

//Langkah 1 Membuat Variabel penampung angka jumlah peserta
// "let" = digunakan untuk nilai variabel yang akan berubah ubah bisa bertambah atau berkurang (counting)
let totalCatatan = 0;

//Langkah 2 Fungsi Update angka counter dan pesan status
function perbaruiJumlah(){
    //Masukkan angka total catatan terbaru ke dalam teks <span id="jumlah-catatan">
    jumlahCatatan.innerText = totalCatatan;

    //Conditional Statement berupa apakah catatan itu kosong/ 0?
    if(totalCatatan === 0){
        //Jika 0 : Hapus class "hidden" supaya teks "belum ada catatan" muncul ke layar
        pesanKosong.classList.remove("hidden");
    } else{
        //Jika >0 : Tambahkan class "hidden" agar teks belum ada catatan tersembunyi
        pesanKosong.classList.add("hidden");
    }
}

//Langkah 3: Fungsi utama logika tambah catatan baru
function tambahCatatan(){
    //3.1 inputCatatan.value fungsi nya untuk mengambil teks yang diketik oleh user 
    //.trim() = menghapus spasi di awal dan di akhir
    const isiTeks = inputCatatan.value.trim();

    //3.2 Validasi Input: Jika isi teks kosong maka tampilkan alert
    if (isiTeks === ""){
        alert("Catatan kamu tidak boleh kosong!")
        return;
    }

    //3.3 document.createElement("li") -> membuat memori du javascript secara dinamis
    const liBaru = document.createElement("li")
    liBaru.className = "note-item"; //menambahkan pada tag li

    //3.4 .innerHTML = mengisi struktur di dalam <li> dengan teks catatan dan tombol hapus
    //tanda backtick(`)
    liBaru.innerHTML = `<span>${isiTeks}</span> <button class="btn-hapus">Hapus</button>`;

    //3.5 Menambahkan Telinga / Event Listener untuk tombol hapus pada catatan dinamis
    //liBaru.querySelector(".btn-hapus") = mengambil tombol ber class "btn-hapus" khusus yang ada di li
    const btnHapus = liBaru.querySelector(".btn-hapus");
    btnHapus.addEventListener("click", function(){
        liBaru.remove(); //menghapus element list dari layar HTML
        totalCatatan--; //total catatan dikurangi sebanyak 1x
        perbaruiJumlah(); //panggil fungsi perbaruiJumlah untuk update angka dilayar
        console.log(`Dom Catatan "${isiTeks}" dihapus.`);
    });

    //3.6 appendChild = memasukkan elemen li ke dalam wadah <ul id="daftar-catatan">
    daftarCatatan.appendChild(liBaru);

    //3.7 Mengosongkan kembali isi kolom input (inputCatatan.value = "") supaya bisa di ketik lagi
    inputCatatan.value = "";

    //3.8 totalCatatan++ artinya tambah nilai total catatan sebanyak 1, lalu update angka ke layar 
    totalCatatan++;
    perbaruiJumlah();

    console.log(`Dom Catatan baru ditambahkan: ${isiTeks}`);
}

//Langkah 4: Event Listener Klik tombol + "Tambah"
//Ketika tombol "+ Tambah" di klik oleh user, maka jalankan fungsi tambah catatan()
btnTambah.addEventListener("click", function(){
    tambahCatatan();
});

//Langkah 5: Event Listener Keyboard "Enter" pada kolom input
//Ketika user mengetk di kolom input dan melepas tombol keyboard (`Event keyup`)
inputCatatan.addEventListener("keyup", function(event){
    //Periksa apakah tombol keyboard yang ditekan user adalah enter?
    if(event.key === "Enter"){
        tambahCatatan(); //Jika ya, jalankan fungsi tambahCatatan()
    }
});