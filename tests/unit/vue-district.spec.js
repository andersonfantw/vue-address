import { shallowMount } from "@vue/test-utils"
import VueAddress from "../../src/components/vh_address.vue"

describe("vh_address.vue", () => {
    it("renders props.name when passed", () => {
        const _name = 'addr'
        const wrapper = shallowMount(VueAddress, {
            propsData: { name:_name }
        })
        expect(wrapper.find("input[id="+_name+"]").isVisible()).toBe(true)
    })
})