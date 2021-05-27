Vue.component('comp', {
  props: ['property'],
  template: `
  <div class="relative overflow-hidden">
    <div class="absolute inset-y-0 h-full w-full" aria-hidden="true">
      <div class="relative h-full">
      </div>
    </div>
    <div class="mx-auto px-5">
      <div class="max-w-screen-lg mx-auto space-y-4 text-center sm:space-y-5 lg:space-y-6">
          <div class="py-6 relative sm:py-12">
          <h1 class="font-extrabold leading-snug mx-auto text-3xl text-gray-900 tracking-wide sm:leading-snug sm:text-4xl sm:tracking-tight lg:leading-tight lg:text-5xl"><span class="block">{{property.title_1}} <a href="" class="text-lightBlue-800 underline hover:text-lightBlue-700">{{property.title_2}}</a></span><span class="block">{{property.title_3}} <a class="text-lightBlue-800 underline hover:text-lightBlue-700" href="">{{property.title_4}}</a></span></h1>
          <h2 class="font-bold font-sans leading-snug max-w-screen-md mt-3 mx-auto text-2xl text-gray-900 tracking-tight sm:text-3xl lg:leading-snug lg:text-4xl">{{property.subtitle}}</h2>
          <p class="max-w-screen-md mt-3 mx-auto text-base text-gray-500 sm:text-xl md:mt-5 lg:text-2xl">{{property.description_1}} <span class="font-semibold">{{property.description_2}}</span> {{property.description_3}} <span class="font-semibold"> {{property.description_4}} {{property.description_5}} </span>{{property.description_6}} {{property.description_7}} {{property.description_8}} <span class="font-semibold">{{property.description_9}}</span> {{property.description_10}}</p>
          <p class="max-w-screen-md mt-3 mx-auto text-base text-gray-500 sm:text-xl md:mt-5 lg:text-2xl">{{property.description_11}}</p>
          <form action="#" class="mt-12 mx-auto sm:flex sm:max-w-lg sm:w-full">
            <div class="min-w-0 flex-1">
              <label for="hero_email" class="sr-only">Email address</label>
              <input id="hero_email" type="email" class="bg-gray-100 block border border-gray-300 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-500 px-5 py-3 rounded-md shadow-sm text-base text-gray-900 w-full" :placeholder="property.email_pholder">
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-3">
              <button type="submit" class="bg-orange-600 block border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 font-medium hover:bg-orange-700 px-5 py-3 rounded-md shadow sm:px-10 text-base text-white w-full">{{property.btn_text}}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="bg-gradient-to-b from-white pb-24 relative to-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <img class="relative ring-1 ring-black ring-opacity-5 rounded-tl rounded-tr shadow-xl" src="images/browser.svg" alt="App screenshot"><img class="relative ring-1 ring-black ring-opacity-5 rounded-bl rounded-br shadow-xl" :src="'images/' + property.image" alt="App screenshot" width="2386" height="1502">
      </div>
    </div>
  </div>
  `
});

var app = new Vue({
  el: '#app',
  data: data
});
