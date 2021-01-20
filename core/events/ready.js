exports.run = async client => {
    await client.user.setActivity("c rien c gokium");
    await client.user.setStatus('dnd');
    //setInterval(startActivity, 600000);
    
    console.log("gokium is running.");
}