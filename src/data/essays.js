export const essays = [
  {
    slug: 'bagaimana-sebuah-design-project-dimulai',
    title: 'Bagaimana sebuah (design) project dimulai?',
    subtitle: 'Kaitan tipe project dengan design process-nya',
    date: '2026-09-21',
    readTime: '3 min',
    substackUrl: 'https://nand0str.substack.com/p/bagaimana-sebuah-design-project-dimulai',
    content: [
      { type: 'p', text: 'Referensi tulisan ini datang dari 4 project type nya Eddie Obeng, cuma modelnya terlalu abstract, gua coba turunin ke contoh yang lebih sering ditemui.' },

      { type: 'h2', text: 'Pintu 1 - Mandat Dari Atas' },
      { type: 'p', text: 'Biasanya datang dari C-level atau VP, atau bisa juga dari regulasi pemerintah (ini sering terjadi di company tempat gua bekerja sekarang). Tipe project yang timeline nya ngebut karena bos pengen liat output secepatnya.' },
      { type: 'kv', items: [
        { k: 'Yang udah clear', v: 'mau bikin apa, karena bos bawa product reference / design reference.' },
        { k: 'Yang belum', v: 'apakah referensi itu nyambung ke konteks bisnis, product dan usernya.' },
      ] },
      { type: 'h3', text: 'Gambaran design processnya' },
      { type: 'p', text: 'Bos biasanya sudah punya referensi dari industri serupa, sehingga approach designer nya adalah menggunakan referensi + kaitkan dengan business objective. Karena outputnya ditunggu cepat, ngga ada waktu buat UT. Yang realistis kamu lakukan adalah pakai usability principle dan men-design sesuai dengan user behavior.' },

      { type: 'h2', text: 'Pintu 2 - Numbers Yang (Agak) Jelek' },
      { type: 'p', text: 'PM atau Data menemukan sinyal (agak) jelek dari analytics atau menemukan funnel yang drop, jadi masalahnya sudah ketahuan duluan.' },
      { type: 'kv', items: [
        { k: 'Yang sudah clear', v: 'metrik mana yang bermasalah.' },
        { k: 'Yang belum', v: 'penyebab angka jelek, hypothesis, dan design solusi yang ingin dibuat.' },
      ] },
      { type: 'h3', text: 'Gambaran design processnya' },
      { type: 'p', text: 'Ini starting point yang lumayan enak, biasanya PM datang dengan hypothesis yang lumayan kuat atau datang dengan problem statement. Dari problem statement kamu bisa langsung frame ke bentuk How Might We, lalu bikin beberapa alternative solutions dan step terakhir translate ke bentuk Figma design.' },

      { type: 'h2', text: 'Pintu 3 - Keluhan Yang Menumpuk di Helpdesk' },
      { type: 'p', text: 'Field team atau CS team mengeskalasi terus menerus ke Product team. Evidencenya berbentuk kualitatif.' },
      { type: 'kv', items: [
        { k: 'Yang sudah clear', v: 'Pain point.' },
        { k: 'Yang belum', v: 'Pain point nya biasa berupa gejala/sinyal, bukan root cause.' },
      ] },
      { type: 'h3', text: 'Gambaran design processnya' },
      { type: 'p', text: 'Starting point yang cukup clear tapi biasanya kerjaan designer di pintu ini belum bisa langsung jump to solution, melainkan melibatkan UX Researcher untuk synthesize tumpukan keluhan users menjadi satu problem statement, lalu align ke PM dan move ke solution space.' },

      { type: 'h2', text: 'Pintu 4 - Bottom Up' },
      { type: 'p', text: 'Starting pointnya berupa observasi dari seorang, delivery nya berupa problem statement dan data atau sebuah PoC.' },
      { type: 'kv', items: [
        { k: 'Yang sudah clear', v: 'Problem statement versi kamu.' },
        { k: 'Yang belum', v: 'Apakah company nya acknowledge dan willing untuk commit?' },
      ] },
      { type: 'h3', text: 'Gambaran design processnya' },
      { type: 'p', text: 'Ini pintu yang paling sering dipakai designer, dan paling sering gagal. Bukan karena idenya jelek, melainkan karena masalah struktural, yaitu ngga ada sponsor dan ngga ada resource.' },
      { type: 'p', text: 'Di tiga pintu sebelumnya komitmen datang duluan di pintu ini kebalikannya. Kamu mulai dari observasi, lalu kumpulin sendiri evidence nya sampai jadi sebuah problem statement. Sebelum mulai terlalu jauh, kita mesti cek: ada ga stakeholders yang interest/perduli? dan nyambung ngga ke objective yang dia kejar? kalau dua duanya jawabannya “nggak” berarti masalahnya adalah timing.' },
      { type: 'p', text: 'Kalau kamu memutuskan untuk tetap commit, biasanya harus extramile, meaning kamu siapkan waktu lebih, karena di situasi ini kamu tetap sambil mengerjakan project yang menjadi prioritas company. Kamu harus siapkan waktu untuk cari supporting evidences yang mendukung hypothesis kamu, lalu cari tau beneficial nya buat user dan busines, dan siapkan multiple design solutions, jangan cuma satu.' },
      { type: 'p', text: 'Ketika ingin pitching, gua merekomendasikan untuk bawa PoC, stakeholders susah untuk mengerti sesuatu yang abstrak.' },

      { type: 'hr' },
      { type: 'p', text: 'Kalau diperhatikan, tiap pintu punya isi yang beda di baris "yang belum". Itu yang sebenarnya menentukan approach kamu.' },
      { type: 'list', items: [
        'Di Pintu 1 yang belum itu asumsinya, jadi kerjaanmu memastikan reference dari stakeholders relevan dengan konteks bisnis dan user behaviour.',
        'Di Pintu 2 yang belum itu solusinya, jadi kerjaanmu bikin design alternative.',
        'Di Pintu 3 yang belum itu problemnya, jadi kerjaanmu merumuskan problem statement.',
        'Di Pintu 4 yang belum itu komitmennya, jadi kerjaanmu convince key stakeholders.',
      ] },
    ],
  },
];
