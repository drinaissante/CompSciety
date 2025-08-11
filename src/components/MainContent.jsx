

function MainContent() {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10']; 

    return (
    <main className="flex-1 p-6 text-gray-800 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-green-200">
            Welcome to the Computer Science Society!
        </h2>

        <div className="bg-white p-6 rounded-lg shadow">
            <p>
                (PLACEHOLDER) Explore upcoming events, get to know your officers, and stay updated.
            </p>
            <p>
                Place events left, right etc.
            </p>
        </div>
        
        {/* 
        <AnimatedList
            items={items}
            onItemSelect={(item, index) => console.log(item, index)}
            showGradients={false}
            enableArrowNavigation={true}
            displayScrollbar={false}
        /> */}

        {/* <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            >
        When does a man die? When he is hit by a bullet? No! When he suffers a disease?
        No! When he ate a soup made out of a poisonous mushroom?
        No! A man dies when he is forgotten!
        </ScrollReveal> */}

        
        {/* <ScrollFloat
            animationDuration={1}
            ease='back.inOut(2)'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.03}
            >
        React Bits
        </ScrollFloat> */}
    </main>
    )
}

export default MainContent;