/*
	Eventually by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function () {
	"use strict";

	var $body = document.querySelector("body");

	// Methods/polyfills.

	// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
	!(function () {
		function t(t) {
			this.el = t;
			for (
				var n = t.className.replace(/^\s+|\s+$/g, "").split(/\s+/), i = 0;
				i < n.length;
				i++
			)
				e.call(this, n[i]);
		}
		function n(t, n, i) {
			Object.defineProperty
				? Object.defineProperty(t, n, { get: i })
				: t.__defineGetter__(n, i);
		}
		if (
			!(
				"undefined" == typeof window.Element ||
				"classList" in document.documentElement
			)
		) {
			var i = Array.prototype,
				e = i.push,
				s = i.splice,
				o = i.join;
			(t.prototype = {
				add: function (t) {
					this.contains(t) ||
						(e.call(this, t), (this.el.className = this.toString()));
				},
				contains: function (t) {
					return -1 != this.el.className.indexOf(t);
				},
				item: function (t) {
					return this[t] || null;
				},
				remove: function (t) {
					if (this.contains(t)) {
						for (var n = 0; n < this.length && this[n] != t; n++);
						s.call(this, n, 1), (this.el.className = this.toString());
					}
				},
				toString: function () {
					return o.call(this, " ");
				},
				toggle: function (t) {
					return (
						this.contains(t) ? this.remove(t) : this.add(t), this.contains(t)
					);
				},
			}),
				(window.DOMTokenList = t),
				n(Element.prototype, "classList", function () {
					return new t(this);
				});
		}
	})();

	// canUse
	window.canUse = function (p) {
		if (!window._canUse) window._canUse = document.createElement("div");
		var e = window._canUse.style,
			up = p.charAt(0).toUpperCase() + p.slice(1);
		return (
			p in e ||
			"Moz" + up in e ||
			"Webkit" + up in e ||
			"O" + up in e ||
			"ms" + up in e
		);
	};

	// window.addEventListener
	(function () {
		if ("addEventListener" in window) return;
		window.addEventListener = function (type, f) {
			window.attachEvent("on" + type, f);
		};
	})();

	// Play initial animations on page load.
	window.addEventListener("load", function () {
		window.setTimeout(function () {
			$body.classList.remove("is-preload");
		}, 100);
	});

	// Slideshow Background.
	(function () {
		// Settings.
		var settings = {
			// Images (in the format of 'url': 'alignment').
			images: {
				"images/bg01.jpg": "center",
				"images/bg02.jpg": "center",
				"images/bg03.jpg": "center",
			},

			// Delay.
			delay: 10000,
		};

		// Vars.
		var pos = 0,
			lastPos = 0,
			$wrapper,
			$bgs = [],
			$bg,
			k,
			v;

		// Create BG wrapper, BGs.
		$wrapper = document.createElement("div");
		$wrapper.id = "bg";
		$body.appendChild($wrapper);

		for (k in settings.images) {
			// Create BG.
			$bg = document.createElement("div");
			$bg.style.backgroundImage = 'url("' + k + '")';
			$bg.style.backgroundPosition = settings.images[k];
			$wrapper.appendChild($bg);

			// Add it to array.
			$bgs.push($bg);
		}

		// Main loop.
		$bgs[pos].classList.add("visible");
		$bgs[pos].classList.add("top");

		// Bail if we only have a single BG or the client doesn't support transitions.
		if ($bgs.length == 1 || !canUse("transition")) return;

		window.setInterval(function () {
			lastPos = pos;
			pos++;

			// Wrap to beginning if necessary.
			if (pos >= $bgs.length) pos = 0;

			// Swap top images.
			$bgs[lastPos].classList.remove("top");
			$bgs[pos].classList.add("visible");
			$bgs[pos].classList.add("top");

			// Hide last image after a short delay.
			window.setTimeout(function () {
				$bgs[lastPos].classList.remove("visible");
			}, settings.delay / 2);
		}, settings.delay);
	})();
})();

//Abels Work

// constants
const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
let drinkSearchButton = document.querySelector(".searchDrink");
let listSection = document.querySelector(".right-side");
//used for display recipe
let itemSelectedShow = null;

//call API
drinkSearchButton.addEventListener("click", () => {
	//clear the list
	listSection.innerHTML = "";
	//retrieve the input value
	let drinkSearching = document
		.querySelector("#drinkName")
		.value.trim()
		.split(" ")
		.join("+")
		.toLowerCase();

	fetch(`${URL}${drinkSearching}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data.drinks);
			//update the list
			mapTheResult(data.drinks);
		})
		.catch((err) => {
			listSection.innerHTML =
				"Sorry! That Poison you are searching for was not found! try another one.";
			console.log("This is the error", err);
		});
});

// display the recipe on click
function mapTheResult(items) {
	items.map((item, i) => {
		console.log(item.strDrink);
		document.querySelector(
			".right-side"
		).innerHTML += `<div id="drink-number-${i}" class="drink">
		<div class='imageName'>
					<a href="#" onclick="showInstruction(${i})">
						<img src=${item.strDrinkThumb} alt="${item.strDrink}" />
					<p>${item.strDrink}</p></a>
					</div>
					<div class="item-list instruct-${i}">
					<div class="ingredient"> <span> Ingredient </span> 
					<ul>
					${getIngredient(item)}</ul>
					</div>
					<div class="instruct">
					<span> Instructions </span>
					<p>${getInstruct(item)}</p>
					</div>
					</div>
				</div>`;
	});
}

//display the recipe on click
function showInstruction(itemNumber) {
	let checkClass = document.querySelector(".drink.show");
	if (checkClass) {
		checkClass.classList.remove("show");
	}

	if (itemSelectedShow !== itemNumber || !checkClass) {
		document
			.querySelector(`#drink-number-${itemNumber}`)
			.classList.toggle("show");
	}

	//set the current selected item
	itemSelectedShow = itemNumber;
}

// get ingredients
function getIngredient(item) {
	let ingredientList = "";
	for (let i = 1; i < 13; i++) {
		let strIngredient = "strIngredient" + i;
		if (item[strIngredient]) {
			ingredientList += `<li>${item[strIngredient]}</li>`;
		}
	}
	return ingredientList;
}

//get the recipe instruction
function getInstruct(item) {
	return `${item.strInstructions}`;
}

//prevent "ENTER" from showing a blank screen
document.addEventListener("DOMContentLoaded", function () {
	document.addEventListener("keypress", (event) => {
		if (event.key === "Enter") {
			document.querySelector(".searchDrink").click();
			event.preventDefault();
		}
	});
});
