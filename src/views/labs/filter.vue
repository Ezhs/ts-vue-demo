<template>
  <div class="page-labs">
    <card
      title="全局过滤器"
      shadow="hover"
      borderDisabled
    >
      <p>格式化时间：{{ time | formatTime }}</p>
      <div>
        <span class="h3">相对时间：</span>
        <ul>
          <li>{{ timeS | formatTime}} =>> {{ timeS | fromNow }}</li>
          <li>{{ timeM | formatTime}} =>> {{ timeM | fromNow }}</li>
          <li>{{ timeH | formatTime}} =>> {{ timeH | fromNow }}</li>
          <li>{{ timeD | formatTime}} =>> {{ timeD | fromNow }}</li>
          <li>{{ timeY | formatTime}} =>> {{ timeY | fromNow }}</li>
        </ul>
      </div>
      <p>手机：{{ 15912345678 | formatPhone }}</p>
      <p>手机：{{ 15912345678 | formatPhoneHide }}</p>
      <p>银行卡：{{ 123123123123132 | formatBank }}</p>
      <p>千分位：{{ 5000039 | toThousands }}</p>
      <p>千分位：{{ '5000039.00' | toThousands }}</p>
      <p>小数位：{{ 3.141590 | formatFloat }}</p>
      <p>中文数字：{{ money }} =>> {{ money | convertCurrency }}</p>
    </card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: +new Date(),
      timeS: new Date() - (20 * 1000),
      timeM: +new Date() - (1 * 60 * 1000),
      timeH: +new Date() - (3 * 60 * 60 * 1000),
      timeD: +new Date() - (1 * 24 * 60 * 60 * 1000),
      timeY: new Date(2018, 7, 16, 14, 30, 0),
      money: 1100.1,
    };
  },
};
</script>

<style lang="scss" scoped>
p {
  padding: 8px 0;
}
h3 {
  margin-bottom: 15px;
}
li {
  padding: 5px 0;
}
</style>
