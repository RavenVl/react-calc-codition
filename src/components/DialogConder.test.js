const rewire = require("rewire")
const DialogConder = rewire("./DialogConder")
const styles = DialogConder.__get__("styles")
// @ponicode
describe("styles", () => {
    test("0", () => {
        let callFunction = () => {
            styles("https://")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            styles("https://api.telegram.org/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            styles("https://croplands.org/app/a/reset?token=")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            styles("www.google.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            styles("https://accounts.google.com/o/oauth2/revoke?token=%s")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            styles(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
