<p><?php echo __('Deleting a section cannot be undone.'); ?></p>
<?php echo $this->Form->postLink(__('Delete Section'), array('controller' => 'sections', 'action' => 'delete', $id), array('class' => 'btn btn-default btn-block btn-danger')); ?>