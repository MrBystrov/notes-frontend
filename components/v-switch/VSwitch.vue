<template>
  <div>
    <div class="switches">
      <label class="switch">
        <input class="switch__input" type="checkbox" role="switch" />
        <span class="switch__sr">Switch 1 (light)</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
  
</script>

<style lang="scss" >



:root {
  --hue: 223;
  --sat: 10%;
  --hue2: 220;
  --sat2: 70%;
  --white: hsl(0, 0%, 100%);
  --light-gray1: hsl(var(--hue), var(--sat), 95%);
  --light-gray2: hsl(var(--hue), var(--sat), 90%);
  --light-gray3: hsl(var(--hue), var(--sat), 85%);
  --light-gray4: hsl(var(--hue), var(--sat), 80%);
  --light-gray5: hsl(var(--hue), var(--sat), 75%);
  --light-gray6: hsl(var(--hue), var(--sat), 70%);
  --light-gray7: hsl(var(--hue), var(--sat), 65%);
  --light-gray8: hsl(var(--hue), var(--sat), 60%);
  --light-gray9: hsl(var(--hue), var(--sat), 55%);
  --gray: hsl(var(--hue), var(--sat), 50%);
  --dark-gray1: hsl(var(--hue), var(--sat), 45%);
  --dark-gray2: hsl(var(--hue), var(--sat), 40%);
  --dark-gray3: hsl(var(--hue), var(--sat), 35%);
  --dark-gray4: hsl(var(--hue), var(--sat), 30%);
  --dark-gray5: hsl(var(--hue), var(--sat), 25%);
  --dark-gray6: hsl(var(--hue), var(--sat), 20%);
  --dark-gray7: hsl(var(--hue), var(--sat), 15%);
  --dark-gray8: hsl(var(--hue), var(--sat), 10%);
  --dark-gray9: hsl(var(--hue), var(--sat), 5%);
  --black: hsl(0, 0%, 0%);
  --success1: hsl(var(--hue2), var(--sat2), 90%);
  --success2: hsl(var(--hue2), var(--sat2), 70%);
  --success2-t: hsla(var(--hue2), var(--sat2), 70%, 0);
  --success3: hsl(var(--hue2), var(--sat2), 50%);
  --success3-t: hsla(var(--hue2), var(--sat2), 50%, 0);
  --trans-dur: 0.3s;
  --trans-timing: cubic-bezier(0.65, 0, 0.35, 1);
}
// body,
// input {
//   color: var(--dark-gray9);
//   font: 1em/1.5 sans-serif;
//   transition: background-color var(--trans-dur), color var(--trans-dur);
// }

.switch__input{
  -webkit-appearance: none;
  appearance: none;
}
.switch {
  display: flex;

  &__input {
    background: {
      clip: padding-box, border-box;
      image: linear-gradient(var(--light-gray5), var(--light-gray2)),
        linear-gradient(var(--light-gray6), var(--white));
      origin: border-box;
    }
    border: 0.0625em solid transparent {
      radius: 0.75em;
    }
    box-shadow: 0 0 0.0625em hsla(var(--hue), var(--sat), 10%, 0.3) inset,
      0 0.375em 0.375em hsla(var(--hue), var(--sat), 10%, 0) inset,
      0 0 0 0.75em var(--success3-t) inset;
    cursor: pointer;
    outline: 0.125em solid hsla(var(--hue), var(--sat), 10%, 0);
    position: relative;
    width: 2.1em;
    height: 1.3em;
    transition: box-shadow var(--trans-dur), outline var(--trans-dur);

    &:before,
    &:after {
      border-radius: 50%;
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;

      [dir="rtl"] & {
        right: 0;
        left: auto;
      }
    }
    &:before {
      background: {
        clip: padding-box, border-box;
        image: linear-gradient(var(--light-gray3), var(--light-gray3)),
          linear-gradient(
            var(--light-gray1),
            var(--light-gray5),
            var(--light-gray1)
          );
        origin: border-box;
      }
      border: 0.125em solid transparent;
      box-shadow: 0 0 0 1px var(--dark-gray1),
        0.125em 0.125em 0.25em hsla(var(--hue), var(--sat), 10%, 0.3);
      margin: 0.0625em;
      width: 1em;
      height: 1em;
      transition: transform var(--trans-dur) var(--trans-timing);
    }
    &:after {
      background-color: var(--light-gray5);
      box-shadow: 0 0 0.125em 0.125em var(--success2-t),
        0 0 0.0625em var(--success2-t) inset, 0 -1px 0 var(--dark-gray1),
        0 1px 0 var(--light-gray1);
      margin: 0.5em;
      width: 0.375em;
      height: 0.375em;
      transition: background-color var(--trans-dur) var(--trans-timing),
        box-shadow var(--trans-dur) var(--trans-timing),
        transform var(--trans-dur) var(--trans-timing);
    }
    &:focus-visible {
      outline: 0.125em solid;
    }
    &:checked {
      box-shadow: 0 0 0.0625em hsla(var(--hue), var(--sat), 10%, 0.3) inset,
        0 0.375em 0.375em hsla(var(--hue), var(--sat), 10%, 0.15) inset,
        0 0 0 0.75em var(--success3) inset;

      &:before,
      &:after {
        transform: translateX(0.8125em);

        [dir="rtl"] & {
          transform: translateX(-0.8125em);
        }
      }
      &:after {
        background-color: var(--success1);
        box-shadow: 0 0 0.125em 0.125em var(--success2),
          0 0 0.0625em var(--success2) inset, 0 -1px 0 var(--dark-gray1),
          0 1px 0 var(--light-gray1);
      }
    }
  }
  &__sr {
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
  }
}
.switches {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  justify-content: center;
  align-items: center;
  padding: 0.75em 0;
}

/* Dark theme */
[data-theme="dark"] {
  // background-color: var(--dark-gray8);

  &,
  input {
    color: var(--light-gray1);
  }
  .switch {
    &__input {
      background: {
        image: linear-gradient(var(--dark-gray7), var(--dark-gray4)),
          linear-gradient(var(--black), var(--dark-gray7));
      }
      box-shadow: 0 0 0.0625em hsla(var(--hue), var(--sat), 10%, 0.6) inset,
        0 0.375em 0.375em hsla(var(--hue), var(--sat), 10%, 0) inset,
        0 0 0 0.75em var(--success3-t) inset;

      &:before {
        background: {
          image: linear-gradient(var(--light-gray9), var(--dark-gray2)),
            linear-gradient(var(--gray), var(--dark-gray4), var(--gray));
        }
        box-shadow: 0 0 0 1px var(--dark-gray8),
          0.125em 0.125em 0.25em hsla(var(--hue), var(--sat), 10%, 0.3);
      }
      &:after {
        background-color: var(--dark-gray4);
        box-shadow: 0 0 0.125em 0.125em var(--success3-t),
          0 0 0.0625em var(--success3-t) inset, 0 -1px 0 var(--black),
          0 1px 0 var(--dark-gray1);
      }
      &:checked {
        box-shadow: 0 0 0.0625em hsla(var(--hue), var(--sat), 10%, 0.6) inset,
          0 0.375em 0.375em hsla(var(--hue), var(--sat), 10%, 0.15) inset,
          0 0 0 0.75em var(--success3) inset;

        &:after {
          background-color: var(--success1);
          box-shadow: 0 0 0.125em 0.125em var(--success3),
            0 0 0.0625em var(--success3) inset, 0 -1px 0 var(--black),
            0 1px 0 var(--dark-gray1);
        }
      }
    }
  }
}

</style>
