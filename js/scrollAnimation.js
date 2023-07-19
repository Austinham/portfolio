 export const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry)=>{
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }

    });

});

export const hidden = document.querySelectorAll('.hide');
hidden.forEach((element)=> observer.observe(element))



