class FollowBtnCtrl {
  constructor(Profile, User, $state) {
    'ngInject';

    this._Profile = Profile;
    this._User = User;

    this._$state = $state;
  }

  submit() {
    this.isSubmitting = true;

    if (!this._User.current) {
      this._state.go('app.register');
      return;
    }

    // If following already, Unfollow
    if (this.user.following) {
      this._Profile.unfollow(this.user.username).then(
        () => {
          this.isSubmitting = false;
          this.user.following = false;
        }
      )
    } else {
      this._Profile.follow(this.user.username).then(
        () => {
          this.isSubmitting = false;
          this.user.following = true;
        }
      )
    }
  }
}

let FollowBtn = {
  bindings: {
    user: '='
  },
  controller: FollowBtnCtrl,
  templateUrl: 'components/buttons/follow-btn.html'
};

export default FollowBtn;
