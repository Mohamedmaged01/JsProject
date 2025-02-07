document.addEventListener('DOMContentLoaded', function () {
   let toggleBtn = document.getElementById('toggle-btn');
   let body = document.body;
   let darkMode = localStorage.getItem('dark-mode');

   const enableDarkMode = () => {
      toggleBtn.classList.replace('fa-sun', 'fa-moon');
      body.classList.add('dark');
      localStorage.setItem('dark-mode', 'enabled');
   };

   const disableDarkMode = () => {
      toggleBtn.classList.replace('fa-moon', 'fa-sun');
      body.classList.remove('dark');
      localStorage.setItem('dark-mode', 'disabled');
   };

   if (darkMode === 'enabled') {
      enableDarkMode();
   }

   toggleBtn.onclick = (e) => {
      darkMode = localStorage.getItem('dark-mode');
      if (darkMode === 'disabled') {
         enableDarkMode();
      } else {
         disableDarkMode();
      }
   };

   let profile = document.querySelector('.header .flex .profile');
   let search = document.querySelector('.header .flex .search-form');

   if (profile) {
      document.querySelector('#user-btn').onclick = () => {
         profile.classList.toggle('active');
         search.classList.remove('active');
      };
   }

   if (search) {
      document.querySelector('#search-btn').onclick = () => {
         search.classList.toggle('active');
         profile.classList.remove('active');
      };
   }

   let sideBar = document.querySelector('.side-bar');
   if (sideBar) {
      document.querySelector('#menu-btn').onclick = () => {
         sideBar.classList.toggle('active');
         body.classList.toggle('active');
      };

      document.querySelector('#close-btn').onclick = () => {
         sideBar.classList.remove('active');
         body.classList.remove('active');
      };
   }




   

   window.onscroll = () => {
      if (profile) profile.classList.remove('active');
      if (search) search.classList.remove('active');

      if (window.innerWidth < 1200) {
         if (sideBar) sideBar.classList.remove('active');
         body.classList.remove('active');
      }
   };
});


document.addEventListener("DOMContentLoaded", function () {
   let deleteButtons = document.querySelectorAll(".delete-btn");

   deleteButtons.forEach(button => {
      button.addEventListener("click", function () {
         let courseBox = this.parentElement; 
         courseBox.remove(); 
      });
   });
});

document.addEventListener("DOMContentLoaded", function () {
   let addCategoryBtn = document.getElementById("add-category-btn");
   let addCategoryForm = document.getElementById("add-category-form");
   let submitCategoryBtn = document.getElementById("submit-category");
   let categoryContainer = document.getElementById("category-container");

   loadCategories();

   addCategoryBtn.addEventListener("click", () => { 
      addCategoryForm.style.display = addCategoryForm.style.display === "none" ? "block" : "none";
   });

   submitCategoryBtn.addEventListener("click", () => {
      let categoryTitle = document.getElementById("category-title").value.trim();
      if (!categoryTitle) {
         alert("Please enter a category title.");
         return;
      }


      if (Array.from(document.querySelectorAll(".title")).some(title => title.innerText.toLowerCase() === categoryTitle.toLowerCase())) {
         alert("A course with this title already exists. Please choose a different title.");
         return;
      }



      let categoryData = {
         title: categoryTitle,
         description: document.getElementById("category-description").value,
         
         image: document.getElementById("category-image").files[0] ? URL.createObjectURL(document.getElementById("category-image").files[0]) : "images/default-thumbnail.png"
      };

      addNewCategory(categoryData);
      saveCategories();
      addCategoryForm.style.display = "none";
   });

   function saveCategories() {
      const categories = Array.from(document.querySelectorAll(".box")).map(categoryElement => ({
         title: categoryElement.querySelector(".title")?.innerText || "No Title",
         image: categoryElement.querySelector(".thumb img")?.src || "",
         description: categoryElement.querySelector("p:nth-of-type(3)")?.innerText || "Good career",
      }));
   
      localStorage.setItem("categories", JSON.stringify(categories));
   }
   

   function loadCategories() {
      const categories = JSON.parse(localStorage.getItem('categories')) || [];
      categories.forEach(categoryData => addCategoryFromData(categoryData));
   }

   function addNewCategory(categoryData) {
      const newCategory = createCategoryElement(categoryData);
      categoryContainer.appendChild(newCategory);
   }

   function addCategoryFromData(categoryData) {
      const newCategory = createCategoryElement(categoryData);
      categoryContainer.appendChild(newCategory);
   }

   function createCategoryElement(categoryData) {
      const newCategory = document.createElement("div");
      newCategory.classList.add("box");
      

      newCategory.innerHTML = `
         <div class="tutor">
            <img src="h.jpg" alt="">
            <div class="info">
               <h2>${categoryData.title}</h2>
               <span>${new Date().toLocaleDateString()}</span>
            </div>
         </div>
         <div class="thumb">
            <img src="${categoryData.image}" alt="Course Image">
            <span>${categoryData.description}</span>
         </div>
         <h3 class="title">${categoryData.title}</h3>
         <p>${categoryData.description}</p>
         
         <button class="update-btn"><i class="fas fa-edit"></i> Update</button>
         <button class="delete-btn"><i class="fas fa-trash"></i> Delete</button>
      `;

      newCategory.querySelector(".update-btn").addEventListener("click", () => {
         window.open(`edit-category.html?title=${encodeURIComponent(categoryData.title)}&description=${encodeURIComponent(categoryData.description)}&image=${encodeURIComponent(categoryData.image)}`, "_blank");
      });

      newCategory.querySelector(".delete-btn").addEventListener("click", () => {
         if (confirm("Are you sure you want to delete this course?")) {
            newCategory.remove();
            saveCategories();
         }
      });

      return newCategory;
   }
});





document.addEventListener("DOMContentLoaded", function () {
   let addCourseBtn = document.getElementById("add-course-btn");
   let addCourseForm = document.getElementById("add-course-form");
   let submitCourseBtn = document.getElementById("submit-course");
   let courseContainer = document.getElementById("course-container");

   loadCourses();

   addCourseBtn.addEventListener("click", () => { 
      addCourseForm.style.display = addCourseForm.style.display === "none" ? "block" : "none";
   });

   submitCourseBtn.addEventListener("click", () => {
      let courseId = document.getElementById("course-Id").value;
      let courseTitle = document.getElementById("course-title").value;

      if (Array.from(document.querySelectorAll(".title")).some(title => title.innerText.toLowerCase() === courseTitle.toLowerCase())) {
         alert("A course with this title already exists. Please choose a different title.");
         return;
      }
      if (Array.from(document.querySelectorAll(".box")).some(course => course.id === `course-${courseId}`)) {  alert("A course with this ID already exists. Please choose a different title.");
         return;
      }



      let courseData = {
         id: courseId,
         title: courseTitle,
         category: document.getElementById("course-category").value,
         instructor: document.getElementById("instructor-name").value,
         description: document.getElementById("course-description").value,
         price: document.getElementById("course-price").value,
         duration: document.getElementById("course-duration").value,
         
         image: document.getElementById("course-image").files[0] ? URL.createObjectURL(document.getElementById("course-image").files[0]) : "images/default-thumbnail.png",
         video: document.querySelector('input[name="course-type"]:checked').value === "link" ? document.getElementById("course-link").value : URL.createObjectURL(document.getElementById("course-file").files[0])
      };

      addNewCourse(courseData);
      saveCourses();
      addCourseForm.style.display = "none";
   });

   function saveCourses() {
      const courses = Array.from(document.querySelectorAll(".box")).map(courseElement => ({
         id: courseElement.id.replace('course-', ''),
         title: courseElement.querySelector(".title").innerText,
         category: courseElement.querySelector(".thumb span").innerText,
         instructor: courseElement.querySelector(".tutor .info h3").innerText,
         description: courseElement.querySelector("p:nth-of-type(3)").innerText,
         price: courseElement.querySelector("p:nth-of-type(1)").innerText.replace('Price: $', ''),
         duration: courseElement.querySelector("p:nth-of-type(2)").innerText.replace('Duration: ', '').replace(' hours', ''),
         image: courseElement.querySelector(".thumb img").src,
         video: courseElement.querySelector(".inline-btn") ? courseElement.querySelector(".inline-btn").href : ''
      }));
      localStorage.setItem('courses', JSON.stringify(courses));
   }

   function loadCourses() {
      const courses = JSON.parse(localStorage.getItem('courses')) || [];
      courses.forEach(courseData => addCourseFromData(courseData));
   }

   function addNewCourse(courseData) {
      const newCourse = createCourseElement(courseData);
      courseContainer.appendChild(newCourse);
   }

   function addCourseFromData(courseData) {
      const newCourse = createCourseElement(courseData);
      courseContainer.appendChild(newCourse);
   }

   function createCourseElement(courseData) {
      const newCourse = document.createElement("div");
      newCourse.classList.add("box");
      newCourse.id = `course-${courseData.id}`;

      newCourse.innerHTML = `
         <div class="tutor">
            <img src="h.jpg" alt="">
            <div class="info">
               <h3>${courseData.instructor}</h3>
               <span>${new Date().toLocaleDateString()}</span>
            </div>
         </div>
         <div class="thumb">
            <img src="${courseData.image}" alt="Course Image">
            <span>${courseData.category}</span>
         </div>
         <h3 class="title">${courseData.title}</h3>
         <p>${courseData.description}</p>
         <p>Price: $${courseData.price}</p>
         <p>Duration: ${courseData.duration} hours</p>
         ${courseData.video ? `<a href="${courseData.video}" target="_blank" class="inline-btn">Watch Video</a>` : ""}
         <button class="update-btn"><i class="fas fa-edit"></i> Update</button>
         <button class="delete-btn"><i class="fas fa-trash"></i> Delete</button>
      `;

      newCourse.querySelector(".update-btn").addEventListener("click", () => {
         window.open(`edit-course.html?courseId=${courseData.id}&title=${encodeURIComponent(courseData.title)}&category=${encodeURIComponent(courseData.category)}&instructor=${encodeURIComponent(courseData.instructor)}&description=${encodeURIComponent(courseData.description)}&price=${encodeURIComponent(courseData.price)}&duration=${encodeURIComponent(courseData.duration)}&video=${encodeURIComponent(courseData.video)}&image=${encodeURIComponent(courseData.image)}`, "_blank");
      });

      newCourse.querySelector(".delete-btn").addEventListener("click", () => {
         if (confirm("Are you sure you want to delete this course?")) {
            newCourse.remove();
            saveCourses();
         }
      });

      return newCourse;
   }
});
