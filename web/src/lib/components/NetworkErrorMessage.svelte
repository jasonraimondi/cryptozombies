<script>
  export let message: string;
  export let dismiss: () => void;
</script>

<div class="alert alert-danger" role="alert">
  {message}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick={dismiss}>
    <span aria-hidden="true">&times;</span>
  </button>
</div>
