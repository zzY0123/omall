<template>
  <div id="user-info">
    <a href="#" class="clearfix">
      <div class="user-icon left">
        <img src="../../../assets/img/profile/user.jpg" alt="">
      </div>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <i class="iconfont icon-shouji"></i>
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
        <svg data-v-735ff1be="" fill="#fff" class="arrow-svg right"><use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg>
      </div>

    </a>
  </div>
</template>

<script>
	export default {
		name: "Login"
	}
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }

  #user-info .user-icon {
    height: 65px;
    width: 65px;
  }

  #user-info .user-icon img{
    /* display: block; */
    height: 65px;
    width: 65px;
    border-radius: 50%;
  }

  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }

  #user-info .left {
    float: left;
  }

  #user-info .arrow-svg {
    width: 11px;
    height: 22px;
    margin-top: 18px;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  #user-info .login-info .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }

  #user-info .login-info .phone .icon-mobile {
    position: absolute;
    width: 12px;
    height: 18px;
    left: -15px;
    top: 0px;
  }
</style>
