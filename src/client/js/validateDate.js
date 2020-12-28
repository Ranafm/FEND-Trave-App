function validateDate() {

    document.getElementById('add').addEventListener('click', function(event) {
        event.preventDefault();
        alert('Element clicked through function!');
        const date = document.getElementById('start-date').value;

        const todayDate = new Date().toJSON().slice(0, 10);
        console.log(todayDate)

        //check the input date with today date 
        if (date < todayDate) {

            alert('Travel Date are not correct ');

        } else {

            alert(' Dates are Correct');


        }
    });
}

// export { validateDate }