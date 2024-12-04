(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function(e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function(e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /**
   * Initiate quill editors
   */
  if (select('.quill-editor-default')) {
    new Quill('.quill-editor-default', {
      theme: 'snow'
    });
  }

  if (select('.quill-editor-bubble')) {
    new Quill('.quill-editor-bubble', {
      theme: 'bubble'
    });
  }

  if (select('.quill-editor-full')) {
    new Quill(".quill-editor-full", {
      modules: {
        toolbar: [
          [{
            font: []
          }, {
            size: []
          }],
          ["bold", "italic", "underline", "strike"],
          [{
              color: []
            },
            {
              background: []
            }
          ],
          [{
              script: "super"
            },
            {
              script: "sub"
            }
          ],
          [{
              list: "ordered"
            },
            {
              list: "bullet"
            },
            {
              indent: "-1"
            },
            {
              indent: "+1"
            }
          ],
          ["direction", {
            align: []
          }],
          ["link", "image", "video"],
          ["clean"]
        ]
      },
      theme: "snow"
    });
  }

  /**
   * Initiate TinyMCE Editor
   */

  const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

  tinymce.init({
    selector: 'textarea.tinymce-editor',
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
    editimage_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_class_list: [{
        title: 'None',
        value: ''
      },
      {
        title: 'Some class',
        value: 'class-name'
      }
    ],
    importcss_append: true,
    file_picker_callback: (callback, value, meta) => {
      /* Provide file and text for the link dialog */
      if (meta.filetype === 'file') {
        callback('https://www.google.com/logos/google.jpg', {
          text: 'My text'
        });
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === 'image') {
        callback('https://www.google.com/logos/google.jpg', {
          alt: 'My alt text'
        });
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === 'media') {
        callback('movie.mp4', {
          source2: 'alt.ogg',
          poster: 'https://www.google.com/logos/google.jpg'
        });
      }
    },
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
  });

  /**
   * Initiate Bootstrap validation check
   */
  var needsValidation = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(needsValidation)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

  /**
   * Initiate Datatables
   */
  const datatables = select('.datatable', true)
  datatables.forEach(datatable => {
    new simpleDatatables.DataTable(datatable, {
      perPageSelect: [5, 10, 15, ["All", -1]],
      columns: [{
          select: 2,
          sortSequence: ["desc", "asc"]
        },
        {
          select: 3,
          sortSequence: ["desc"]
        },
        {
          select: 4,
          cellClass: "green",
          headerClass: "red"
        }
      ]
    });
  })

  /**
   * Autoresize echart charts
   */
  const mainContainer = select('#main');
  if (mainContainer) {
    setTimeout(() => {
      new ResizeObserver(function() {
        select('.echart', true).forEach(getEchart => {
          echarts.getInstanceByDom(getEchart).resize();
        })
      }).observe(mainContainer);
    }, 200);
  }

})();







// CALENDAR
const daysContainer = document.getElementById("days");
const monthYear = document.getElementById("monthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const noteModal = document.getElementById("noteModal");
const noteInput = document.getElementById("noteInput");
const saveNoteBtn = document.getElementById("saveNote");
const closeModal = document.querySelector(".close");

// Set user role (for demo purposes: "admin" or "user")
const currentUserRole = "admin"; // Change this to "user" for non-admin

let currentDate = new Date();
let notes = JSON.parse(localStorage.getItem("calendarNotes")) || {};

// Functions to render the calendar
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  daysContainer.innerHTML = "";

  // Fill in the days
  for (let i = 0; i < firstDay; i++) {
    daysContainer.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= lastDate; day++) {
    const isToday =
      day === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();

    const note = notes[`${year}-${month}-${day}`];
    const hasNote = note ? "has-note" : "";

    daysContainer.innerHTML += `
      <div class="day ${isToday ? "current-day" : ""} ${hasNote}" 
           data-date="${year}-${month}-${day}" 
           data-note="${note ? note.text : ''}"
           data-admin="${note ? note.admin : false}">
        ${day}
      </div>`;
  }

  // Add click events to each day
  document.querySelectorAll(".day").forEach((day) =>
    day.addEventListener("click", openNoteModal)
  );
}

// Open the modal for adding a note
function openNoteModal(e) {
  const selectedDate = e.target.dataset.date;
  const existingNote = notes[selectedDate];

  // If the note exists and was added by admin, non-admin users can't edit it
  if (existingNote && existingNote.admin && currentUserRole !== "admin") {
    alert("This note was added by the admin and cannot be edited.");
    return;
  }

  noteInput.value = existingNote ? existingNote.text : "";
  noteModal.dataset.date = selectedDate;
  noteModal.style.display = "block";
}

// Save the note
saveNoteBtn.addEventListener("click", () => {
  const selectedDate = noteModal.dataset.date;
  const noteText = noteInput.value.trim();

  if (noteText) {
    notes[selectedDate] = {
      text: noteText,
      admin: currentUserRole === "admin", // Mark if the note is from an admin
    };
  } else {
    delete notes[selectedDate]; // Remove note if empty
  }

  // Save notes to localStorage (simulating a backend)
  localStorage.setItem("calendarNotes", JSON.stringify(notes));

  renderCalendar();
  noteModal.style.display = "none";
});

// Close the modal
closeModal.addEventListener("click", () => {
  noteModal.style.display = "none";
});

// Change month
prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Initialize the calendar
renderCalendar();






// QR and PDF Generation
document.getElementById('concernForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Getting form data
  const deptState = document.getElementById('deptState').value;
  const programState = document.getElementById('programState').value;
  const courseState = document.getElementById('courseState').value;
  const educState = document.getElementById('educState').value;
  const concernState = document.getElementById('concernState').value;
  const otherConcernState = document.getElementById('otherConcernState').value;
  const desConcernState = document.getElementById('desConcernState').value;

  // Generate QR Code data
  const qrCodeData = `
  \nDeparment: ${deptState}
  \nProgram: ${programState}
  \nCourse: ${courseState}
  \nEducator: ${educState}
  \nConcern: ${concernState}
  \nOther Concern: ${otherConcernState}
  \nShort Description of Concern: ${desConcernState}
  `;

  // Create QR Code
  const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

  // Generate PDF
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.setFontSize(16);
  pdf.text("Submitted Concern", 20, 20);
  pdf.setFontSize(12);

  // Add form data to PDF
  pdf.text(`Department: ${deptState}`, 20, 30);
  pdf.text(`Program: ${programState}`, 20, 40);
  pdf.text(`Course: ${courseState}`, 20, 50);
  pdf.text(`Educator: ${educState}`, 20, 60);
  pdf.text(`Concern: ${concernState}`, 20, 70);
  pdf.text(`Other Concern: ${otherConcernState}`, 20, 80);
  pdf.text(`Short Description of Concern: ${desConcernState}`, 20, 90);

  // Add QR Code to PDF
  pdf.addImage(qrCodeUrl, 'PNG', 20, 110, 50, 50);

  // Save and trigger the PDF download
  pdf.save('Submitted_Concern.pdf');

  // Optional: Redirect to the downloaded file (if it's available in your server or file location)
  // window.location.href = 'path_to_the_generated_pdf_file';
});