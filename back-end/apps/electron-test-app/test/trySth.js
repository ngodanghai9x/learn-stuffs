const { mouse, keyboard, Button, Key, Point, straightTo } = require("@nut-tree-fork/nut-js");

mouse.config.mouseSpeed = 300; // càng lớn càng chậm

async function handleInputMessage(msg) {
    if (msg.type === 'mouse_move') {
        console.log("🚀 ~ handleInputMessage ~ msg:", msg)
        // await mouse.move([new Point(msg.x, msg.y)]);
        await mouse.move(straightTo(new Point(msg.x + 100, msg.y + 100)));
    }

    if (msg.type === 'mouse_click') {
        const button = msg.button === 'left' ? Button.LEFT
                      : msg.button === 'right' ? Button.RIGHT
                      : Button.MIDDLE;
        await mouse.click(button);
    }

    if (msg.type === 'key_down') {
        const key = Key[msg.key.toUpperCase()];
        if (key) {
            await keyboard.type(key);
        } else {
            console.warn(`Unknown key: ${msg.key}`);
        }
    }
    
}

handleInputMessage({type: 'mouse_move', x: 800, y: 800})
handleInputMessage({type: 'mouse_click', button: 'right'})