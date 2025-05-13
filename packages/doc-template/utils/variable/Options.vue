<template>
    <ul class="variables items">
        <li v-for="(option, index) in availableOptions" :key="index" class="item" :class="{ 'is-selected': selectedIndex === index }" @click="selectItem(index)">
            <strong>{{ option.key }}</strong> <em>{{ option.label }}</em>
        </li>
    </ul>
</template>

<script>
import values from './values'

export default {
    props: {
        command: {
            type: Function,
            required: true
        },
        query: {
            type: String,
            required: false
        }
    },
    data () {
        return {
            selectedIndex: 0,
            values
        }
    },
    computed: {
        availableOptions () {
            return Object.keys(this.values).filter(key => key.indexOf(this.query.trim().toLowerCase()) > -1).map(key => ({
                key,
                label: this.values[key]
            }))
        }
    },
    watch: {
        query () {
            this.selectedIndex = 0
        }
    },
    methods: {
        onKeyDown ({ event }) {
            switch (event.key) {
                case 'ArrowUp':
                    this.selectedIndex = ((this.selectedIndex + this.availableOptions.length) - 1) % this.availableOptions.length
                    return true
                case 'ArrowDown':
                    this.selectedIndex = (this.selectedIndex + 1) % this.availableOptions.length
                    return true
                case 'Enter':
                case 'Tab':
                    this.selectItem(this.selectedIndex)
                    return true
            }

            return false
        },
        selectItem (selectedIndex) {
            if (this.availableOptions[selectedIndex]) {
                this.command({ name: this.availableOptions[selectedIndex].key })
            }
        }
    }
}
</script>
