<template>
  <q-page class="full-height justify-center items-center column">
    <div class="row">
      <div class="q-pa-md" style="min-width: 360px">
        <h2 class="q-mt-none">Đăng nhập</h2>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            outlined
            dense
            v-model="email"
            label="Email *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            outlined
            dense
            v-model="password"
            label="Password *"
            type="password"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <div>
            <q-btn label="Đăng nhập" type="submit" color="primary" />
            <q-btn
              label="Nhập lại"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import CryptoJS from "crypto-js";

export default {
  setup() {
    const $q = useQuasar();

    const email = ref(null);
    const password = ref(null);
    const key = "82f2ceed4c503896c8a291e560bd4325"; // change to your key

    return {
      email,
      password,

      onSubmit() {
        let data = {
          txt_email: email.value,
          txt_password: password.value,
        };

        // Encrypt
        const ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify(data),
          key
        ).toString();

        data = {
          pa: ciphertext,
        };

        $q.notify({
          message: `${ciphertext}`,
          color: "primary",
          multiLine: true,
        });

        // Simple POST request with a JSON body using fetch
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        };
        fetch("http://localhost:3456/v1/user/login", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            // Decrypt
            var bytes = CryptoJS.AES.decrypt(data.re, key);
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
            const result = JSON.parse(originalText);

            $q.notify({
              message: `${JSON.stringify(result)}`,
              color: "primary",
              multiLine: true,
            });
          });
      },

      onReset() {
        email.value = null;
        password.value = null;
      },
    };
  },
};
</script>