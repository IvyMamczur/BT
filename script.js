diff --git a/script.js b/script.js
index dbd0d56ce69dd1c30347ad46b1e05682a8694564..a4677bffcdd93aebed969764194898a1042a4981 100644
--- a/script.js
+++ b/script.js
@@ -1,21 +1,34 @@
-document.addEventListener('DOMContentLoaded', () => {
+document.addEventListener("DOMContentLoaded", () => {
   // animácia kariet pri scrolle
-  const observer = new IntersectionObserver(entries => {
-    entries.forEach(entry => {
-      if (entry.isIntersecting) {
-        entry.target.classList.add('visible');
-      }
-    });
-  }, { threshold: 0.2 });
+  const observer = new IntersectionObserver(
+    (entries) => {
+      entries.forEach((entry) => {
+        if (entry.isIntersecting) {
+          entry.target.classList.add("visible");
+        }
+      });
+    },
+    { threshold: 0.2 },
+  );
 
-  document.querySelectorAll('.card').forEach(card => observer.observe(card));
+  document.querySelectorAll(".card").forEach((card) => observer.observe(card));
 
   // burger menu toggle (pôvodné správanie)
-  const burger = document.getElementById('burger');
-  const nav = document.getElementById('nav');
+  const burger = document.getElementById("burger");
+  const nav = document.getElementById("nav");
   if (burger && nav) {
-    burger.addEventListener('click', () => {
-      nav.classList.toggle('open');
+    burger.addEventListener("click", () => {
+      nav.classList.toggle("open");
+    });
+    window.addEventListener("resize", () => {
+      if (window.innerWidth > 600) {
+        nav.classList.remove("open");
+      }
     });
+    nav
+      .querySelectorAll(".menu a")
+      .forEach((link) =>
+        link.addEventListener("click", () => nav.classList.remove("open")),
+      );
   }
 });
