exports.run = async client => {
    await client.user.setActivity("c rien c gokium");
    await client.user.setStatus('dnd');
    
    console.log("gokium is running.");
}