async function getUser(user, load) {
  if (load) {
  setLoading()
  }
    var response = await fetch('https://tools.scratchstatus.org/wasteof/'+user+'/')
    var data = await response.json()
  if (data.hasOwnProperty('error')) {
    document.querySelector('h1.username').textContent = 'error'
    document.querySelector('h3.bio').textContent = data['error']
  } else {
    var username = data['name']
    var userid = data['id']
    var verified = data['verified']
    var beta = data['beta']
    var online = data['online']
    var admin = data['permissions']['admin']
    var banned = data['permissions']['banned']
    var bio = data['bio']
    var followers = data['stats']['followers']
    var following = data['stats']['following']
    var posts = data['stats']['posts']
    document.querySelector('h2.title').textContent = 'Stats:'
  document.querySelector('h3.bio').textContent = bio
  document.querySelector('h1.username').textContent = username
    document.querySelector('a.username2').href = `https://wasteof.money/users/${username}/`
    document.querySelector('h1.username').title = 'view on wasteof.money'
  document.head.querySelector('title').textContent = `wasteof.stats | ${username}`
  document.querySelector('h3.id').textContent = `id: ${userid}`
      document.querySelector('h3.stats.followers').textContent = `${followers} followers`
    document.querySelector('h3.stats.following').textContent = `${following} following`
    document.querySelector('h3.stats.posts').textContent = `${posts} posts`
  if (online) {
    document.querySelector('h3.status').textContent = 'online'
    document.querySelector('h3.status').style.color = '#9aff78'
  } else {
    if (banned) {
    document.querySelector('h3.status').textContent = 'banned'
    document.querySelector('h3.status').style.color = '#ff8178'
    } else {
      document.querySelector('h3.status').textContent = 'offline'
    document.querySelector('h3.status').style.color = '#ff8178'
    }
  }
  if (admin === true) {
    var txt = document.querySelector('h3.id').textContent
    document.querySelector('h3.id').textContent = txt+' (admin)'
  }
  if (verified === true) {
    var txt = document.querySelector('h3.id').textContent
    document.querySelector('h3.id').textContent = txt+' (verified)'
  }
  if (beta === true) {
    var txt = document.querySelector('h3.id').textContent
    document.querySelector('h3.id').textContent = txt+' (beta tester)'
  }
  }
  finishLoading()
}
async function ok() {
    var response = await fetch('https://tools.scratchstatus.org/wasteof/')
    var data = await response.json()
    var item = Object.keys(data)[Math.floor(Math.random()*Object.keys(data).length)];
    getUser(data[item]['name'], false)
}
setLoading()
ok()

function setLoading() {
  document.querySelector('a.username2').href = ``
  document.querySelector('h1.username').title = ''
  document.body.querySelectorAll('*').forEach(function(el) {
    if (el.nodeName !== 'svg') {
      if (el.nodeName !== 'A') {
    el.textContent = ''
      }
    }
    console.log(el.nodeName)
    if (el.className === 'username' || el.className === 'bio' || el.className === 'username2') {
      
    } else {
      el.style.display = 'none'
    }
  })
  document.querySelector('h1.username').textContent = 'Loading data...'
  var facts = ['wasteof.stats is actually NOT made by wasteof.money', 'you can get financial advice at <a href="https://is.wasteof.money">is.wasteof.money</a>', 'wasteof.money started off as a fun project so that the domain name had something on it', 'wasteof.money has over 1.5k users', 'wasteof.money is undergoing an entire rewrite, visit <a href="https://wasteof.money/beta">wasteof.money/beta</a> for more']
  document.querySelector('h3.bio').innerHTML = `did u know: ${facts[Math.floor(Math.random()*facts.length)]}`
}

function finishLoading() {
  document.querySelectorAll('*').forEach(function(el) {
    if (el.className === 'username' || el.className === 'bio') {
      
    } else {
      el.style.display = ''
    }
  })
}
