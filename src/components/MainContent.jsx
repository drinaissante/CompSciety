import AnimatedList from "../extras/AnimatedList.jsx";

function MainContent() {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10']; 

    return (
    <main className="flex-1 p-6 text-gray-800 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-green-200">Welcome to the Computer Science Society!</h2>

        <div className="bg-white p-6 rounded-lg shadow">
            <p>
                (PLACEHOLDER) Explore upcoming events, get to know your officers, and stay updated.
            </p>
            <p>
                Place events left, right etc.
            </p>
        </div>

        <AnimatedList
            items={items}
            onItemSelect={(item, index) => console.log(item, index)}
            showGradients={true}
            enableArrowNavigation={true}
            displayScrollbar={true}
        />
        
    </main>
    )
}

export default MainContent;