function Chat() {
    return (
        <div>
            <form >
                <div className="text-[#F5F5F5] text-center mt-4">
                    <h1>Messenger</h1>
                </div>
				<div >
					<input name="name" label="Name" />
				</div>
				<div>
					<input
						name="message"
						label="Message"
					/>
				</div>
				<button>Send Message</button>
			</form>
        </div>
    )
}

export default Chat
