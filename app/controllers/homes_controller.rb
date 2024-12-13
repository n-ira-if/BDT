class HomesController < ApplicationController

  def index
    if user_signed_in?
      @messages = [
        "今日は素晴らしい一日ですね！",
        "やる気満々ですね！",
        "素敵な笑顔を忘れずに！",
        "新しい挑戦に挑んでみましょう！",
        "今日も頑張りましょう！"
      ]
      @random_message = @messages.sample
    end
  end

end
