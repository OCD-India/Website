var team = [
    {
        "name": "Gagan Gulyani",
        "role": "Co-Lead",
        "img": "1.jpeg",
        "description": "Backend Developer (Flask), An Artist, Community Manager of HTM (HackTheMountains) and Content Creator.",
        "socialLinks": [
            {
                "src": "linkedin.svg",
                "href": "https://twitter.com/GaganGulyani",
            },
            {
                "src": "pinterest.svg",
                "href": "https://twitter.com/GaganGulyani",
            },
            {
                "src": "facebook.svg",
                "href": "https://twitter.com/GaganGulyani",
            }
        ]
    },

    {
        "name": "Rishabh Bansal",
        "role": "Co-Lead",
        "img": "2.jpg",
        "description": "Involved with communities since 2017. He is a MLH mentor, an Engineer at Oracle and has been associated with various communities like GDG Cloud New Delhi, DSC VIT Vellore.",
        "socialLinks": [
            {
                "src": "linkedin.svg",
                "href": "https://twitter.com/RishabBansal400",
            },
            {
                "src": "pinterest.svg",
                "href": "https://twitter.com/RishabBansal400",
            },
            {
                "src": "facebook.svg",
                "href": "https://twitter.com/RishabBansal400",
            }
        ]
    }
];

var findIndex = function(arr, fn) {
    return arr.reduce(function(carry, item, idx) { 
        if(fn(item, idx)) return idx;
        return carry;
    }, -1);
};

function displayMember(memberName) {
    var memberIndex = findIndex(team, function(mn) { return mn.name === memberName });
    var member = team[memberIndex];
    document.querySelector('.about_selected_member_container .about_selected_member_avatar').src = "./assets/team/" + member.img;
    document.querySelector('.about_selected_member_container .text_block_main_title').innerHTML = member.name;
    document.querySelector('.about_selected_member_container .text_block_sub_title').innerHTML = member.role;
    document.querySelector('.about_selected_member_container .para').innerHTML = member.description;
    document.querySelector('.about_team_img .about_team_img_bounce').classList.remove('about_team_img_bounce');
    document.querySelector('.about_team_img .about_team_img_' + (memberIndex + 1)).classList.add('about_team_img_bounce');
    document.querySelector('.about_selected_member_social').innerHTML ="";

    member.socialLinks.forEach(function(sl) {
        var linkImg = document.createElement('img');
        linkImg.setAttribute('src', './assets/social-icons/' + sl.src);
        var newlink = document.createElement('a');
        newlink.setAttribute('class', 'about_social_icon');
        newlink.setAttribute('target', '_blank');
        newlink.setAttribute('href', sl.href);
        newlink.appendChild(linkImg);
        document.querySelector('.about_selected_member_social').appendChild(newlink);
    })
}

window.onload = function() {

    var intersections = document.querySelectorAll("[data-intersection-id]");

    function animatePosition (target) { return target.classList.remove("start_pos") };
    
    function animateNumbers(target) {
        target.removeAttribute('data-intersection-id');
        var start = target.dataset.animateNumberFrom * 1 || 0,
        end = target.dataset.animateNumberTo * 1 || 100,
        duration = target.dataset.animateNumberDuration * 1 || 2000,
        current = start,
        currentNormalized = current,
        range = end - start,
        increment = range / duration * 10,
        timer = setInterval(function() {
            current += increment;
            current = Math.floor(current);
            currentNormalized = current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            target.textContent = currentNormalized;
            if (current >= end) clearInterval(timer);
        }, 10);
    }

    var intersectionThreshold;
    var observer = new IntersectionObserver(function(entries) {

        entries.forEach(function(entry) {
            if(!entry.target.dataset) console.log(entry.target)
            if (entry.intersectionRatio > 0) {
                intersectionThreshold = entry.target.dataset.intersectionThreshold * 1 || 0.5;

                if (entry.target.dataset.intersectionId === "exp_num") return animateNumbers(entry.target);
                return animatePosition(entry.target);

            }
        });
    }, { threshold: intersectionThreshold });

    for(var key in intersections) {
        if(key === "length") return;
        observer.observe(intersections[key]);
    }
    
};